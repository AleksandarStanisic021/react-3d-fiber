import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const Portfolio = () => {
  return (
    <>
      <OrbitControls makeDefault enableDamping />
      <mesh scale={1}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

export default Portfolio;
