import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  Float,
  Text,
  MeshReflectorMaterial,
  Html,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";

const Exp = () => {
  const boxRef = useRef();

  useFrame((state, delta) => {});

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

      <mesh position-x={-3}>
        <sphereGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>

      <mesh ref={boxRef} scale={2}>
        <boxGeometry position-x={2} />
        <meshStandardMaterial args={[{ color: "purple" }]} />
        <Html center position={[1, 1, 0]}>
          <div style={{ background: "green", padding: 5 }}>
            <h1 style={{ color: "red" }}>Test</h1>
            <p>Super Box</p>
          </div>
        </Html>
      </mesh>
      <TransformControls object={boxRef} />

      <mesh position-y={-1} scale={[10, 10, 1]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial color={"gold"} />
      </mesh>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
        <Text
          color="salmon"
          position={[1.5, 2.2, 0.5]}
          fontSize={0.5}
          anchorX="center"
          anchorY="middle">
          I Love 3D!
        </Text>
      </Float>
    </>
  );
};

export default Exp;
