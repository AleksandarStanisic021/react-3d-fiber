import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} />
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

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>

      <mesh castShadow scale={1} position={[2, -0.5, 2]}>
        <boxGeometry />
        <meshStandardMaterial args={[{ color: "red" }]} />
      </mesh>

      <mesh
        receiveShadow
        scale={[10, 10, 1]}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial color={"green"} />
      </mesh>
    </>
  );
};

export default Scene;
