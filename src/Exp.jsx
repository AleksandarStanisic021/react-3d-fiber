import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const Exp = () => {
  const boxRef = useRef();

  useFrame((state, delta) => {});

  return (
    <>
      <directionalLight />
      <ambientLight color={"white"} intensity={2} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={3}
        maxDistance={12}
        autoRotate={true}
        enablePan={false}
      />
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
        <mesh ref={boxRef} scale={1} position={[2, -0.5, 2]}>
          <boxGeometry />
          <meshStandardMaterial args={[{ color: "blue" }]} />
        </mesh>
        <mesh position-y={-1} scale={[10, 10, 1]} rotation-x={-Math.PI * 0.5}>
          <planeGeometry />
          <meshStandardMaterial args={[{ color: "green" }]} />
        </mesh>
      </mesh>
    </>
  );
};

export default Exp;
