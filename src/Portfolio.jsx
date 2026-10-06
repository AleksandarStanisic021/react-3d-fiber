import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const Portfolio = () => {
  return (
    <>
      <directionalLight />
      <ambientLight color={"azure"} intensity={2} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={3}
        maxDistance={12}
        autoRotate={true}
        enablePan={false}
      />
      <mesh scale={1} position={[2, -0.5, 2]}>
        <boxGeometry />
        <meshStandardMaterial args={[{ color: "red" }]} />
      </mesh>
    </>
  );
};

export default Portfolio;
