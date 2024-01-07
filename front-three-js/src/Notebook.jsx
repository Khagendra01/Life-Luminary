import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Notebook = () => {
  const notebookRef = useRef();

  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    notebookRef.current.appendChild(renderer.domElement);

    // Create notebook
    const notebookGeometry = new THREE.BoxGeometry(5, 1, 7);
    const notebookMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const notebook = new THREE.Mesh(notebookGeometry, notebookMaterial);
    scene.add(notebook);

    // Set camera position
    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the notebook
      notebook.rotation.x += 0.01;
      notebook.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={notebookRef} />;
};

export default Notebook;
