import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box() {
  return (
    <mesh rotation={[0.5, 0.8, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <Box />
        <OrbitControls enableZoom />
      </Canvas>
    </div>
  );
}

export default App;
