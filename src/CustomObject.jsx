const CustomObject = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial args={[{ color: "red" }]} />
    </mesh>
  );
};

export default CustomObject;
