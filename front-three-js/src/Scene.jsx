import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Box } from '@react-three/drei';
import Computer from './Computer';
import Clock from './Clock';
import Newspaper from './Newspaper';

const Scene = () => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-1.2, 0, 0]}>
          <Computer position={[0, 0, 0]} />
        </Box>
        <Box position={[1.2, 0, 0]}>
          <Clock position={[0, 0, 0]} />
        </Box>
        <Box position={[0, 0, 0]}>
          <Newspaper position={[0, 0, 0]} />
        </Box>
      </Canvas>
    </div>
  );
};

export default Scene;