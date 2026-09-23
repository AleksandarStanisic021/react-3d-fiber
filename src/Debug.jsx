import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useControls } from "leva";

const Debug = () => {
  const { position } = useControls({
    position: {
      value: -2,
      max: 4,
      min: -3,
      step: 0.01,
    },
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

      <mesh position-x={position}>
        <sphereGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>

      <mesh position={[-2, -0.5, 0]}>
        <boxGeometry />
        <meshStandardMaterial args={[{ color: "red" }]} />
      </mesh>

      <mesh scale={[10, 10, 1]} position-y={-1} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial color={"green"} />
      </mesh>
    </>
  );
};

export default Debug;
