import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Keys = () => {
  const boxRef = useRef();

  const eventHandler = (event) => {
    console.log("Key pressed:", event.key);
  };

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta;
  });

  return (
    <>
      <directionalLight position={[1, 2, 3]} />
      <ambientLight color={"white"} intensity={0.5} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={3}
        maxDistance={12}
        autoRotate={true}
        enablePan={false}
      />

      <mesh ref={boxRef} onClick={eventHandler} scale={2} position-y={1}>
        <boxGeometry />
        <meshStandardMaterial args={[{ color: "blue" }]} />
      </mesh>

      <mesh rotation-x={-Math.PI * 0.5} scale={12.5}>
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "green" }]} />
      </mesh>
    </>
  );
};

export default Keys;
