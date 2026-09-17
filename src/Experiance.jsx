import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { color } from "three/tsl";

const Experiance = () => {
  const boxRef = useRef();

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta * 2;
  });
  return (
    <>
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial args={[{ color: "crimson" }]} />
      </mesh>
      <mesh ref={boxRef} scale={1} position={[2, 0, 2]}>
        <boxGeometry />
        <meshBasicMaterial args={[{ color: "blue" }]} />
      </mesh>
      <mesh position-y={-1} scale={[10, 10, 1]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshBasicMaterial args={[{ color: "green" }]} />
      </mesh>
    </>
  );
};

export default Experiance;
