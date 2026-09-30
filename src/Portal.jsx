import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Sparkles,
  Center,
  Float,
  Text,
  MeshReflectorMaterial,
  Html,
  useTexture,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import { Color, MeshNormalMaterial } from "three";

import { useGLTF } from "@react-three/drei";

import portalVertex from "./shaders/portal/vertex.glsl?raw";
import portalFragment from "./shaders/portal/fragment.glsl?raw";

const Portal = () => {
  const { nodes } = useGLTF("./model/portal.glb");
  const texture = useTexture("./model/baked.jpg");
  texture.flipY = false;
  const sparkleColor = new Color().setHSL(Math.random(), 0.9, 0.68);
  const portalMaterial = useRef(null);
  const shaderUniforms = useRef({
    uTime: { value: 0 },
    uColorStart: { value: new Color("#7028e8") },
    uColorEnd: { value: new Color("#7dff35") },
  });

  useFrame(({ clock }) => {
    if (portalMaterial.current) {
      portalMaterial.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <>
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

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={texture} />
        </mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}>
          <meshBasicMaterial color="#fffce5" />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}>
          <meshBasicMaterial color="#fffce5" />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}>
          <shaderMaterial
            ref={portalMaterial}
            vertexShader={portalVertex}
            fragmentShader={portalFragment}
            uniforms={shaderUniforms.current}
          />
        </mesh>

        <Sparkles
          position-y={1}
          scale={[4, 2, 4]}
          size={2}
          speed={0.5}
          count={100}
          color={sparkleColor}
        />
      </Center>
    </>
  );
};

export default Portal;
