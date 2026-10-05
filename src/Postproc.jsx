import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Postproc = () => {
  const boxRef = useRef();

  const eventHandler = (event) => {
    boxRef.current.material.color.set(
      `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    );
  };

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta;
  });

  return (
    <>
      <directionalLight position={[1, 2, 3]} />
      <ambientLight color={"white"} intensity={0.5} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={3}
        maxDistance={12}
        autoRotate={true}
        enablePan={false}
      />

      <mesh
        ref={boxRef}
        onClick={eventHandler}
        scale={2}
        position-y={1}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}>
        <boxGeometry />
        <meshStandardMaterial args={[{ color: "blue" }]} />
      </mesh>

      <mesh
        position-z={1}
        position-x={-3}
        position-y={1}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <sphereGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>

      <mesh rotation-x={-Math.PI * 0.5} scale={12.5}>
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "green" }]} />
      </mesh>
    </>
  );
};

export default Postproc;
