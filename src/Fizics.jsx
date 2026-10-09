import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

const Fizics = () => {
  return (
    <>
      <ambientLight color="red" intensity={0.8} />
      <directionalLight
        castShadow
        position={[4, 8, 5]}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
      />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={3}
        maxDistance={12}
        autoRotate={true}
        enablePan={false}
      />

      <mesh castShadow receiveShadow scale={0.5} position={[0, 1, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow receiveShadow scale={0.5} position={[-3, 1, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="purple" />
      </mesh>

      <mesh castShadow receiveShadow scale={1} position={[2, 1.2, 0]}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh castShadow receiveShadow position={[5, 1, 0]} scale={1}>
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>

      <mesh castShadow receiveShadow scale={[20, 1, 20]}>
        <boxGeometry />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
};

export default Fizics;
