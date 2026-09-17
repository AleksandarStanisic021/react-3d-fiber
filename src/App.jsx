import { Canvas } from "@react-three/fiber";
import Experiance from "./Experiance";

function App() {
  return (
    <div
      style={{
        width: "80%",
        height: "80%",
        position: "fixed",
        top: "0px",
      }}>
      <Canvas>
        <Experiance />
      </Canvas>
      <div style={{ background: "orange", color: "green", padding: "1rem" }}>
        COMPONENT
      </div>
    </div>
  );
}

export default App;
