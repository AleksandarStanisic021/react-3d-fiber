import { color } from "three/tsl";

const Experiance = () => {
  return (
    <>
      <mesh scale={[1.3, 1, 1]}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial args={[{ color: "crimson" }]} />
      </mesh>
    </>
  );
};

export default Experiance;
