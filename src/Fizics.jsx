import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

const Fizics = () => {
  const box = useRef();

  useEffect(() => {}, []);

  const cubeJump = () => {
    box.current.applyImpulse({ x: 0, y: 5, z: 0 });
    box.current.applyTorqueImpulse({
      x: Math.random() * 2 - 1,
      y: 1,
      z: Math.random() * 2 - 1,
    });
  };

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
        autoRotate={true}
        enablePan={false}
      />
      <Physics>
        <RigidBody colliders="ball">
          <mesh castShadow receiveShadow scale={0.5} position={[-2, 6, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="ball">
          <mesh castShadow receiveShadow scale={0.5} position={[2, 1, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="purple" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="trimesh">
          <mesh castShadow receiveShadow scale={1} position={[2, 5, 0]}>
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
            <meshStandardMaterial color="darkgreen" />
          </mesh>
        </RigidBody>

        <RigidBody ref={box} colliders="cuboid">
          <mesh
            onClick={cubeJump}
            castShadow
            receiveShadow
            position={[2, 3, 0]}
            scale={1}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="cuboid" type="fixed">
          <mesh castShadow receiveShadow scale={[20, 1, 20]}>
            <boxGeometry />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};

export default Fizics;
