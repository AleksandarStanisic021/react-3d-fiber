import { OrbitControls } from "@react-three/drei";

const Keys = () => {
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

      <mesh scale={2} position-y={1}>
        <boxGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>

      <mesh rotation-x={-Math.PI * 0.5} scale={12.5}>
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "green" }]} />
      </mesh>
    </>
  );
};

export default Keys;
