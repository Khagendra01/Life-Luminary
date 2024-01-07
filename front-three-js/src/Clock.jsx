import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

function ClockHand({ rotationSpeed }) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += rotationSpeed;
  });

  return (
    <Cylinder ref={mesh} args={[0.05, 0.05, 1, 32]}>
      <meshStandardMaterial attach="material" color="black" />
    </Cylinder>
  );
}

function Clock() {
  const date = new Date();
  const seconds = date.getSeconds() / 60;
  const minutes = (date.getMinutes() + seconds) / 60;
  const hours = (date.getHours() + minutes) / 12;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box args={[1, 0.05, 1]}>
          <meshStandardMaterial attach="material" color="white" />
        </Box>
        <ClockHand rotationSpeed={THREE.MathUtils.degToRad(6)} position={[0, 0.5, 0]} />
        <ClockHand rotationSpeed={THREE.MathUtils.degToRad(6 * 60)} position={[0, 0.5, 0]} />
        <ClockHand rotationSpeed={THREE.MathUtils.degToRad(6 * 60 * 12)} position={[0, 0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default Clock;