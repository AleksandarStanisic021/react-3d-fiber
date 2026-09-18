import { BoxGeometry, Mesh } from "three";

const CustomObject = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial args={[{ color: "red" }]} />
    </mesh>
  );
};

export default CustomObject;
