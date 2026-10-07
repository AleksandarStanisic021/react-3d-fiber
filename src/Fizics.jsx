import { useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

const Fizics = () => {
  return (
    <>
      <ambientLight color="azure" intensity={0.8} />
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

      <Physics>
        <RigidBody>
          <mesh
            castShadow
            receiveShadow
            scale={0.5}
            position-x={-2}
            position-y={4.5}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody>
          <mesh castShadow receiveShadow scale={1} position={[2, 3.5, 2]}>
            <boxGeometry />
            <meshStandardMaterial color="purple" />
          </mesh>
        </RigidBody>

        <RigidBody>
          <mesh castShadow receiveShadow scale={1} position={[1.8, 4, 2]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody>
          <mesh castShadow receiveShadow scale={1} position={[1.6, 5, 2]}>
            <boxGeometry />
            <meshStandardMaterial color="blue" />
          </mesh>
        </RigidBody>

        <RigidBody mass={0} type="fixed">
          <mesh
            castShadow
            receiveShadow
            position-y={-1}
            scale={[10, 10, 1]}
            rotation-x={-Math.PI * 0.5}>
            <boxGeometry />
            <meshStandardMaterial color="darkgreen" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};

export default Fizics;
