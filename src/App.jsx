import { Canvas } from "@react-three/fiber";
import Experiance from "./Experiance";
import Exp from "./Exp";
import Scene from "./Scene";
import Debug from "./Debug";
import * as THREE from "three";
import Loading from "./Loading";
import Portal from "./Portal";
import Keys from "./Keys";
import Postproc from "./Postproc";
import Portfolio from "./Portfolio";
import Fizics from "./Fizics";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
      }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true }}>
        <Fizics />
      </Canvas>
    </div>
  );
}

export default App;
