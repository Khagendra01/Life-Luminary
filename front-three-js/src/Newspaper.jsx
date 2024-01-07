import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';


//import './Newspaper.css'; // Import the CSS file for styling

gsap.registerPlugin(ScrollTrigger);

function Box() {
  const mesh = useRef();

  // Rotate mesh every frame
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
}

export default function Newspaper() {
  const ref = useRef();
  const [refItem, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      x: 100,
    });
  }, []);

  return (
    <div ref={refItem} className="newspaper">
      <Canvas ref={ref}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  );
}