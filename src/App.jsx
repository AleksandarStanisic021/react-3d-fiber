import { Canvas } from "@react-three/fiber";
import Experiance from "./Experiance";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
      }}>
      <Canvas>
        <Experiance />
      </Canvas>
    </div>
  );
}

export default App;
