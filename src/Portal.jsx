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
  Trail,
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
  const energyRef = useRef(null);
  const shaderUniforms = useRef({
    uTime: { value: 0 },
    uColorStart: { value: new Color("#c026ff") },
    uColorEnd: { value: new Color("#7dff35") },
  });

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    if (portalMaterial.current) {
      portalMaterial.current.uniforms.uTime.value = time;
    }

    if (energyRef.current) {
      energyRef.current.position.set(
        Math.cos(time * 1.3) * 0.8,
        Math.sin(time * 1.3) * 0.5,
        0.12,
      );
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

        <Trail width={0.12} length={8} color="#a855f7">
          <mesh ref={energyRef} scale={0.08}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#b8ff4a" toneMapped={false} />
          </mesh>
        </Trail>

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
