import { color } from "three/tsl";

const Experiance = () => {
  return (
    <>
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial args={[{ color: "red", wireframe: true }]} />
      </mesh>
    </>
  );
};

export default Experiance;
