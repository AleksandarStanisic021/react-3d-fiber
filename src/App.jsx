import { Canvas } from "@react-three/fiber";
import Experiance from "./Experiance";
import Exp from "./Exp";
import Scene from "./Scene";
import Debug from "./Debug";
import { cloneUniforms } from "three/src/renderers/shaders/UniformsUtils.js";

function App() {
  const created = ({ gl }) => {
    console.log(gl);
    gl.setClearColor("#1e1efe");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
      }}>
      <Canvas onCreated={created}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
