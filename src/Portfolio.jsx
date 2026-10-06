import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
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
          </mesh>
        </Float>
        <ContactShadows position={-1.0} />
      </PresentationControls>
    </>
  );
};

export default Portfolio;
