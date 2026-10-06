import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  MeshReflectorMaterial,
  Environment,
  OrbitControls,
} from "@react-three/drei";

const Portfolio = () => {
  return (
    <>
      <PresentationControls global rotation={[0.13, 0.1, 0]}>
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Environment preset="city" />
          <mesh scale={2}>
            <boxGeometry />
            <MeshReflectorMaterial color="red" />
            <Html transform>
              <p>Welcome to my portfolio!</p>
              <iframe src="https://bruno-simon.com/html" />
            </Html>
          </mesh>
        </Float>
      </PresentationControls>
    </>
  );
};

export default Portfolio;
