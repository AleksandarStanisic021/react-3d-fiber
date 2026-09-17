import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TorusKnotGeometry } from "three";

const Experiance = () => {
  return (
    <>
      <Canvas>
        <mesh>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </>
  );
};

export default Experiance;
