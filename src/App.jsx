import { Canvas } from "@react-three/fiber";
import Experiance from "./Experiance";
import Exp from "./Exp";
import Scene from "./Scene";
import Debug from "./Debug";
import * as THREE from "three";

function App() {
  const created = ({ scene }) => {
    console.log(scene);
    scene.background = new THREE.Color("purple");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
      }}>
      <Canvas shadows onCreated={created}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
