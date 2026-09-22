import { Canvas } from "@react-three/fiber";
import Experiance from "./Experiance";
import Exp from "./Exp";

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
        <Exp />
      </Canvas>
    </div>
  );
}

export default App;
