import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { useControls } from "leva";

const Debug = () => {
  const { position, color } = useControls("sphere", {
    position: {
      value: 2,
      max: 4,
      min: -3,
      step: 0.01,
    },
    color: "#ffa600",
  });

  const { boxposition, boxcolor } = useControls("cube", {
    boxposition: {
      value: { x: 0, y: 0 },
      step: 0.01,
    },
    boxcolor: "#e42712",
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

      <mesh position-x={-4}>
        <sphereGeometry position-x={-2} />
        <meshStandardMaterial args={[{ color: color }]} />
      </mesh>

      <mesh position-x={4}>
        <boxGeometry />
        <meshStandardMaterial color={boxcolor} />
      </mesh>

      <mesh scale={[10, 10, 1]} position-y={-1} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial color={"green"} />
      </mesh>
    </>
  );
};

export default Debug;
