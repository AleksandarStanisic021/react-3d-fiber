import {
  Float,
  Text,
  MeshReflectorMaterial,
  Html,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import { MeshNormalMaterial } from "three";

const Portal = () => {
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

      <mesh scale={2}>
        <boxGeometry position-x={2} />
        <meshNormalMaterial />
      </mesh>

      <mesh position-y={-1} scale={[10, 10, 1]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </>
  );
};

export default Portal;
