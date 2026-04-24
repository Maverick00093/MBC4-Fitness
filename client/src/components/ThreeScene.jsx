import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * ThreeScene Component
 * Creates a 3D hero scene with:
 * - Wireframe/metallic dumbbell model (gold finish)
 * - Floating gold particle system (200 particles)
 * - Mouse parallax effect
 * - Continuous Y-axis rotation
 * - Responsive canvas resizing
 */
function ThreeScene() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /* ── Scene Setup ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Lighting ── */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe5c167, 2, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe5c167, 1.5, 50);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 30);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);

    /* ── Dumbbell Model ── */
    const dumbbellGroup = new THREE.Group();

    // Gold metallic material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5c167,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xe5c167,
      emissiveIntensity: 0.05,
    });

    // Dark metal material for accents
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.95,
      roughness: 0.15,
    });

    // Center bar (handle)
    const barGeometry = new THREE.CylinderGeometry(0.12, 0.12, 4.5, 16);
    const bar = new THREE.Mesh(barGeometry, darkMetal);
    bar.rotation.z = Math.PI / 2;
    dumbbellGroup.add(bar);

    // Grip texture on center
    const gripGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.6, 8);
    const gripMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.7,
      roughness: 0.5,
    });
    const grip = new THREE.Mesh(gripGeometry, gripMaterial);
    grip.rotation.z = Math.PI / 2;
    dumbbellGroup.add(grip);

    // Weight plates (left side)
    const plateGeometry1 = new THREE.CylinderGeometry(0.85, 0.85, 0.3, 24);
    const plateGeometry2 = new THREE.CylinderGeometry(0.7, 0.7, 0.25, 24);
    const plateGeometry3 = new THREE.CylinderGeometry(0.55, 0.55, 0.2, 24);

    [-1, 1].forEach((side) => {
      const plate1 = new THREE.Mesh(plateGeometry1, goldMaterial);
      plate1.position.x = side * 1.5;
      plate1.rotation.z = Math.PI / 2;
      dumbbellGroup.add(plate1);

      const plate2 = new THREE.Mesh(plateGeometry2, goldMaterial);
      plate2.position.x = side * 1.8;
      plate2.rotation.z = Math.PI / 2;
      dumbbellGroup.add(plate2);

      const plate3 = new THREE.Mesh(plateGeometry3, darkMetal);
      plate3.position.x = side * 2.0;
      plate3.rotation.z = Math.PI / 2;
      dumbbellGroup.add(plate3);

      // End cap
      const capGeometry = new THREE.SphereGeometry(0.18, 12, 12);
      const cap = new THREE.Mesh(capGeometry, goldMaterial);
      cap.position.x = side * 2.25;
      dumbbellGroup.add(cap);
    });

    dumbbellGroup.position.y = 0.3;
    scene.add(dumbbellGroup);

    /* ── Gold Particle System ── */
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005 + 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe5c167,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    /* ── Mouse Tracking ── */
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    /* ── Animation Loop ── */
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Dumbbell rotation (slow Y-axis + gentle float)
      dumbbellGroup.rotation.y += 0.005;
      dumbbellGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
      dumbbellGroup.position.y = 0.3 + Math.sin(elapsed * 0.8) * 0.2;

      // Mouse parallax on dumbbell
      const targetRotX = mouseRef.current.y * 0.15;
      const targetRotZ = mouseRef.current.x * 0.1;
      dumbbellGroup.rotation.x += (targetRotX - dumbbellGroup.rotation.x) * 0.02;
      dumbbellGroup.rotation.z += (targetRotZ - dumbbellGroup.rotation.z) * 0.02;

      // Animate particles
      const posArray = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];

        // Wrap particles around
        if (posArray[i * 3 + 1] > 10) posArray[i * 3 + 1] = -10;
        if (Math.abs(posArray[i * 3]) > 10) posArray[i * 3] *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Subtle camera sway
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.01;
      camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.01;
      camera.lookAt(0, 0, 0);

      // Animate lights
      pointLight1.position.x = Math.sin(elapsed * 0.7) * 5;
      pointLight1.position.y = Math.cos(elapsed * 0.5) * 3;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize Handler ── */
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="three-scene"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default ThreeScene;
