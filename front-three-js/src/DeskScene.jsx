// src/DeskScene.js
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DeskScene = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(5, 1, 3),
      new THREE.MeshBasicMaterial({ color: 0x8B4513 }) // Brown color for the desk
    );
    scene.add(desk);

    const books = Array.from({ length: 3 }, (_, index) => {
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 1, 0.2),
        new THREE.MeshBasicMaterial({ color: 0x3366ff }) // Blue color for the books
      );
      book.position.set(index - 1, 0.5, 1); // Adjust positions
      scene.add(book);
      return book;
    });

    const newspaper = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.1, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load('path/to/newspaperTexture.jpg') })
    );
    newspaper.position.set(0, 0.55, -1);
    scene.add(newspaper);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      books.forEach((book, index) => {
        book.rotation.y += 0.01 * (index % 2 === 0 ? 1 : -1); // Rotate books
      });

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default DeskScene;
