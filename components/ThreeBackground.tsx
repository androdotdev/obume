"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = mountRef.current;
        if (!el) return;

        const W = el.clientWidth, H = el.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);
        el.appendChild(renderer.domElement);

        const COUNT = 180;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const palette = [
            [0.43, 0.90, 0.72],
            [0.58, 0.77, 0.99],
            [0.96, 0.45, 0.72],
            [0.99, 0.85, 0.40],
        ];
        for (let i = 0; i < COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 90;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 90;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
            const c = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
        }
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const mat = new THREE.PointsMaterial({ size: 0.5, vertexColors: true, transparent: true, opacity: 0.6 });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        const rings: THREE.Mesh[] = [];
        [
            { r: 14, tube: 0.08, color: 0x6EE7B7, tilt: 0.4 },
            { r: 20, tube: 0.05, color: 0x93C5FD, tilt: -0.6 },
            { r: 9, tube: 0.10, color: 0xF472B6, tilt: 1.0 },
        ].forEach(cfg => {
            const g = new THREE.TorusGeometry(cfg.r, cfg.tube, 16, 100);
            const m = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.15 });
            const mesh = new THREE.Mesh(g, m);
            mesh.rotation.x = cfg.tilt;
            mesh.rotation.y = Math.random() * Math.PI;
            scene.add(mesh);
            rings.push(mesh);
        });

        let mx = 0, my = 0;
        let targetX = 0, targetY = 0;
        const onMouse = (e: MouseEvent) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouse, { passive: true });

        const onResize = () => {
            const w = el.clientWidth, h = el.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize, { passive: true });

        let raf: number;
        const startTime = performance.now();
        const animate = () => {
            raf = requestAnimationFrame(animate);
            const t = (performance.now() - startTime) / 1000;
            
            mx += (targetX - mx) * 0.03;
            my += (targetY - my) * 0.03;
            
            points.rotation.y = t * 0.02;
            points.rotation.x = t * 0.01;
            rings.forEach((r, i) => {
                r.rotation.z = t * (0.03 + i * 0.015);
                r.rotation.y = t * 0.02;
            });
            camera.position.x = mx * 2;
            camera.position.y = -my * 1.5;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMouse);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            geo.dispose();
            mat.dispose();
            if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
