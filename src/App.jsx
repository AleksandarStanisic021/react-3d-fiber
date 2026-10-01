import { Canvas } from "@react-three/fiber";
import Experiance from "./Experiance";
import Exp from "./Exp";
import Scene from "./Scene";
import Debug from "./Debug";
import * as THREE from "three";
import Loading from "./Loading";
import Portal from "./Portal";
import Keys from "./Keys";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
      }}>
      <Canvas flat>
        <Keys />
      </Canvas>
    </div>
  );
}

export default App;
