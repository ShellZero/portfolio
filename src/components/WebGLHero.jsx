import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexA, uTexB;
  uniform vec2  uRes;
  uniform float uAspA, uAspB;
  uniform float uProgress, uTime, uZoom;
  uniform vec2  uMouse;
  uniform float uReduce;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
  }
  vec2 cover(vec2 uv, float imgAsp, float zoom, vec2 par){
    float pAsp=uRes.x/uRes.y;
    vec2 r=vec2(min(pAsp/imgAsp,1.0),min((1.0/pAsp)/(1.0/imgAsp),1.0));
    uv=(uv-0.5)/zoom+0.5; uv+=par;
    return vec2(uv.x*r.x+(1.0-r.x)*0.5, uv.y*r.y+(1.0-r.y)*0.5);
  }
  void main(){
    vec2 par=uMouse*0.018*(1.0-uReduce);
    vec4 a=texture2D(uTexA,cover(vUv,uAspA,uZoom,par));
    vec4 b=texture2D(uTexB,cover(vUv,uAspB,uZoom*1.04,par*1.2));
    float n=noise(vUv*3.2+uTime*0.02);
    float m=1.0-smoothstep(uProgress-0.18,uProgress+0.18,n);
    vec4 col=mix(a,b,m);
    float l=dot(col.rgb,vec3(0.299,0.587,0.114));
    l=(l-0.5)*1.08+0.5;
    vec3 c=vec3(l);
    c+=( hash(vUv*uRes.xy*0.5+uTime)-0.5)*0.045;
    float d=distance(vUv,vec2(0.5));
    c*=smoothstep(0.95,0.32,d)*0.55+0.55;
    gl_FragColor=vec4(clamp(c,0.0,1.0),1.0);
  }
`;

export function WebGLHero({ images = [], interval = 4600 }) {
  const canvasRef = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const loader = new THREE.TextureLoader();
    const cfg = (t) => {
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    };
    const load = (src) =>
      new Promise((res) =>
        loader.load(
          src,
          (t) => res(cfg(t)),
          undefined,
          () => res(null),
        ),
      );

    const uniforms = {
      uTexA: { value: null },
      uTexB: { value: null },
      uAspA: { value: 1.5 },
      uAspB: { value: 1.5 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uZoom: { value: 1.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uReduce: { value: reduce ? 1 : 0 },
    };
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(mesh);

    const aspectOf = (t) => (t?.image ? t.image.width / t.image.height : 1.5);

    const resize = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let raf,
      running = true,
      idx = 0,
      transition = null;
    const cache = [];
    const TRANS = reduce ? 1100 : 1500;

    (async () => {
      cache[0] = await load(images[0]);
      uniforms.uTexA.value = cache[0];
      uniforms.uAspA.value = aspectOf(cache[0]);
      cache[1 % images.length] = await load(images[1 % images.length]);
      uniforms.uTexB.value = cache[1 % images.length];
      uniforms.uAspB.value = aspectOf(cache[1 % images.length]);
      resize();
      canvas.style.opacity = "1";
      images.forEach((src, i) => {
        if (!cache[i])
          load(src).then((t) => {
            cache[i] = t;
          });
      });
    })();

    let lastAdvance = performance.now();
    const start = performance.now();

    const frame = (now) => {
      if (!running) return;
      const t = (now - start) / 1000;
      uniforms.uTime.value = t;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      uniforms.uMouse.value.set(mouse.x, -mouse.y);
      uniforms.uZoom.value = reduce ? 1.0 : 1.06 + Math.sin(t * 0.18) * 0.05;

      if (!transition && now - lastAdvance > interval && cache.filter(Boolean).length > 1) {
        const to = (idx + 1) % images.length;
        if (cache[to]) {
          uniforms.uTexB.value = cache[to];
          uniforms.uAspB.value = aspectOf(cache[to]);
          transition = { t0: now, to };
        }
      }
      if (transition) {
        const p = Math.min((now - transition.t0) / TRANS, 1);
        uniforms.uProgress.value = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        if (p >= 1) {
          idx = transition.to;
          uniforms.uTexA.value = uniforms.uTexB.value;
          uniforms.uAspA.value = uniforms.uAspB.value;
          uniforms.uProgress.value = 0;
          transition = null;
          lastAdvance = now;
        }
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    canvas.style.transition = "opacity 1.2s ease";
    canvas.style.opacity = "0";
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      mesh.geometry.dispose();
      mat.dispose();
      cache.forEach((t) => t?.dispose());
      renderer.dispose();
    };
  }, [images, interval, reduce]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
