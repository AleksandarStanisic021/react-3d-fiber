import { useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef } from "react";

const Fizics = () => {
  const boxRef = useRef();

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta * 2;
  });
  return (
    <>
      <ambientLight color="azure" intensity={0.8} />
      <directionalLight
        castShadow
        position={[4, 8, 5]}
        intensity={2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
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
      <mesh castShadow receiveShadow position-x={-2} position-y={4.5}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        ref={boxRef}
        scale={1}
        position={[2, 3.5, 2]}>
        <boxGeometry />
        <meshStandardMaterial color="purple" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        position-y={-1}
        scale={[10, 10, 1]}
        rotation-x={-Math.PI * 0.5}>
        <boxGeometry />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
};

export default Fizics;
