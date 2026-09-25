import { Sky, OrbitControls, MeshReflectorMaterial } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <directionalLight castShadow shadow-mapSize={1024} position={[1, 2, 3]} />
      <ambientLight color={"white"} intensity={0.5} />
      <Sky />
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

      <mesh castShadow receiveShadow position->
        <sphereGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>

      <mesh castShadow receiveShadow scale={1} position={[1.5, -0.5, 1]}>
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
