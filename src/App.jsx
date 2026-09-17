import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TorusKnotGeometry } from "three";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <mesh>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
