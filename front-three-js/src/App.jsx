import React from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const ChairModel = () => {
  const gltf = useLoader(GLTFLoader, '/models/chair.gltf');
  return <primitive object={gltf.scene} scale={0.5} />;
};

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <ChairModel />
    </Canvas>
  );
};

export default App;
