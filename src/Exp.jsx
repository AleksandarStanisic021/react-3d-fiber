import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";

const Exp = () => {
  const boxRef = useRef();

  useFrame((state, delta) => {});

  return (
    <>
      <directionalLight position={[1, 2, 3]} />
      <ambientLight color={"white"} intensity={0.5} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={3}
        maxDistance={12}
        autoRotate={true}
        enablePan={false}
      />

      <mesh position-x={-3}>
        <sphereGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>

      <TransformControls position-x={2} position-y={1}>
        <mesh scale={2}>
          <boxGeometry />
          <meshStandardMaterial args={[{ color: "purple" }]} />
        </mesh>
      </TransformControls>

      <mesh position-y={-1} scale={[10, 10, 1]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "green" }]} />
      </mesh>
    </>
  );
};

export default Exp;
