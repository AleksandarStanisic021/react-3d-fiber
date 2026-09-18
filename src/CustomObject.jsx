const CustomObject = () => {
  const verticesCount = 10 * 3;

  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial args={[{ color: "red" }]} />
    </mesh>
  );
};

export default CustomObject;
