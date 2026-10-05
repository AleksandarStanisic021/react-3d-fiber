import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vignette, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Postproc = () => {
  const boxRef = useRef();

  useFrame((state, delta) => {
    boxRef.current.rotation.y += delta;
  });

  return (
    <>
      <EffectComposer>
        <Vignette
          eskil={false}
          offset={0.1}
          darkness={1.1}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
      <directionalLight position={[1, 2, 3]} />
      <ambientLight color={"white"} intensity={0.5} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={3}
        maxDistance={12}
        autoRotate={true}
        enablePan={false}
      />

      <mesh ref={boxRef} scale={2} position-y={1}>
        <boxGeometry />
        <meshStandardMaterial args={[{ color: "teal" }]} />
      </mesh>

      <mesh position-z={1} position-x={-3} position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>

      <mesh rotation-x={-Math.PI * 0.5} scale={12.5}>
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "green" }]} />
      </mesh>
    </>
  );
};

export default Postproc;
