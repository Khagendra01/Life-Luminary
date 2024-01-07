function Monitor() {
    const mesh = useRef();
  
    // Rotate mesh every frame
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  
    return (
      <mesh ref={mesh}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 0.1]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
    );
  }
  
  export default function Computer() {
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
      <div ref={refItem} className="computer">
        <Canvas ref={ref}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Monitor />
        </Canvas>
      </div>
    );
  }