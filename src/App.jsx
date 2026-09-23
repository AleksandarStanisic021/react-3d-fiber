import { Canvas } from "@react-three/fiber";
import Experiance from "./Experiance";
import Exp from "./Exp";
import Debug from "./Debug";
import { Leva } from "leva";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
      }}>
      <Leva collapsed />
      <Canvas>
        <Debug />
      </Canvas>
    </div>
  );
}

export default App;
