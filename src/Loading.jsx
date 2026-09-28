import { Sky, OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Loading = () => {
  const model = useLoader(GLTFLoader, "./hamburger.glb");

  return (
    <>
      <directionalLight castShadow shadow-mapSize={1024} position={[1, 2, 3]} />
      <ambientLight color={"white"} intensity={0.5} />
      <Sky color="red" />
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

      <mesh scale={[10, 10, 1]} position-y={-1} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial color={"green"} />
      </mesh>
      <primitive object={model.scene} position-y={-1} scale={0.35} />
    </>
  );
};

export default Loading;
