import { color } from "three/tsl";

const Experiance = () => {
  return (
    <>
      <mesh position-x={-2}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial args={[{ color: "crimson" }]} />
      </mesh>
      <mesh position-x={2}>
        <boxGeometry />
        <meshBasicMaterial args={[{ color: "blue" }]} />
      </mesh>
      <mesh scale={[3, 2, 2]} rotateX={45}>
        <planeGeometry />
        <meshBasicMaterial args={[{ color: "green" }]} />
      </mesh>
    </>
  );
};

export default Experiance;
