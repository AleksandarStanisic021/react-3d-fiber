import {
  Center,
  Float,
  Text,
  MeshReflectorMaterial,
  Html,
  useTexture,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import { MeshNormalMaterial } from "three";

import { useGLTF } from "@react-three/drei";

const Portal = () => {
  const { nodes } = useGLTF("./model/portal.glb");
  const texture = useTexture("./model/baked.jpg");
  texture.flipY = false;

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
          rotation={nodes.portalLight.rotation}></mesh>
      </Center>
    </>
  );
};

export default Portal;
