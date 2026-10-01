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

      <mesh scale={2}>
        <boxGeometry position-x={2} />
        <meshStandardMaterial args={[{ color: "yellow" }]} />
      </mesh>
    </>
  );
};

export default Keys;
