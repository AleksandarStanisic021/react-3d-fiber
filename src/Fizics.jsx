import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { button, useControls } from "leva";
import { useMemo, useRef, useState } from "react";
import twisterVertexShader from "./shaders/twister/vertex.glsl?raw";
import twisterFragmentShader from "./shaders/twister/fragment.glsl?raw";

const Fizics = () => {
  const box = useRef(null);
  const twister = useRef(null);
  const twisterMaterial = useRef(null);
  const twisterAngle = useRef(0);
  const batchSize = useRef(100);
  const nextInstanceId = useRef(0);
  const stressInstances = useRef([]);
  const [stressInstancesState, setStressInstances] = useState([]);
  const twisterUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  const [, setStressControls] = useControls(
    "Physics stress test",
    () => ({
      batchSize: {
        value: 100,
        min: 10,
        max: 250,
        step: 10,
        onChange: (value) => {
          batchSize.current = value;
        },
      },
      objectCount: { value: 0, editable: false },
      spawn: button(() => {
        const count = Math.min(
          batchSize.current,
          1000 - stressInstances.current.length,
        );
        if (count <= 0) return;

        const firstIndex = stressInstances.current.length;
        const instances = Array.from({ length: count }, (_, index) => {
          const gridIndex = firstIndex + index;
          const column = gridIndex % 18;
          const row = Math.floor(gridIndex / 18) % 18;
          const layer = Math.floor(gridIndex / (18 * 18));

          return {
            key: `stress-${nextInstanceId.current++}`,
            position: [
              (column - 8.5) * 0.9,
              8 + layer * 0.8,
              (row - 8.5) * 0.9,
            ],
            rotation: [0, Math.random() * Math.PI, 0],
            scale: [0.55, 0.55, 0.55],
          };
        });
        const updatedInstances = [...stressInstances.current, ...instances];
        stressInstances.current = updatedInstances;
        setStressInstances(updatedInstances);
        setStressControls({ objectCount: updatedInstances.length });
      }),
      clear: button(() => {
        stressInstances.current = [];
        setStressInstances([]);
        setStressControls({ objectCount: 0 });
      }),
    }),
    [],
  );

  const stressBodies = useMemo(() => {
    if (stressInstancesState.length === 0) return null;

    return (
      <InstancedRigidBodies
        instances={stressInstancesState}
        colliders="cuboid"
        restitution={0.2}
        friction={0.8}>
        <instancedMesh
          args={[undefined, undefined, stressInstancesState.length]}
          castShadow
          receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </instancedMesh>
      </InstancedRigidBodies>
    );
  }, [stressInstancesState]);

  useFrame(({ clock }, delta) => {
    if (twisterMaterial.current) {
      twisterMaterial.current.uniforms.uTime.value = clock.elapsedTime;
    }
    if (!twister.current) return;

    twisterAngle.current += delta;
    const angle = twisterAngle.current;
    const halfAngle = angle / 2;
    const radius = 3;

    twister.current.setNextKinematicTranslation({
      x: Math.cos(angle) * radius,
      y: 1,
      z: Math.sin(angle) * radius,
    });
    twister.current.setNextKinematicRotation({
      x: 0,
      y: Math.sin(halfAngle),
      z: 0,
      w: Math.cos(halfAngle),
    });
  });

  const cubeJump = (event) => {
    event.stopPropagation();
    box.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
    box.current.applyTorqueImpulse(
      {
        x: Math.random() * 2 - 1,
        y: 1,
        z: Math.random() * 2 - 1,
      },
      true,
    );
  };

  return (
    <>
      <ambientLight color="red" intensity={0.8} />
      <directionalLight
        castShadow
        position={[4, 8, 5]}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
      />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        autoRotate={true}
        enablePan={false}
      />
      <Physics>
        <RigidBody colliders="ball" restitution={1} friction={1}>
          <mesh castShadow receiveShadow scale={0.5} position={[-4, 7, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="ball" restitution={1} friction={1}>
          <mesh castShadow receiveShadow scale={0.5} position={[3, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="purple" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="trimesh" restitution={1} friction={1}>
          <mesh castShadow receiveShadow scale={1} position={[2, 5, 0]}>
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={box}
          colliders="cuboid"
          position={[2, 3, 0]}
          restitution={0.2}
          friction={1}>
          <mesh onClick={cubeJump} castShadow receiveShadow scale={1}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders="cuboid" type="fixed" restitution={1} friction={1}>
          <mesh castShadow receiveShadow scale={[20, 0.5, 20]}>
            <boxGeometry />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[0.25, 5, 10]} position={[-9.75, 5, 0]} />
          <CuboidCollider args={[0.25, 5, 10]} position={[9.75, 5, 0]} />
          <CuboidCollider args={[9.75, 5, 0.25]} position={[0, 5, -9.75]} />
          <CuboidCollider args={[9.75, 5, 0.25]} position={[0, 5, 9.75]} />
        </RigidBody>
        {stressBodies}
        <RigidBody
          ref={twister}
          type="kinematicPosition"
          colliders={false}
          position={[0, 1, 0]}
          friction={1}>
          <CuboidCollider args={[6, 0.4, 0.4]} />
          <mesh castShadow receiveShadow>
            <boxGeometry args={[12, 0.8, 0.8]} />
            <shaderMaterial
              ref={twisterMaterial}
              vertexShader={twisterVertexShader}
              fragmentShader={twisterFragmentShader}
              uniforms={twisterUniforms}
              toneMapped={false}
            />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};

export default Fizics;
