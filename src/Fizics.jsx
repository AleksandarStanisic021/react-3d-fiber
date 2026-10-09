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
  const twisterImpactLight = useRef(null);
  const twisterImpact = useRef(0);
  const twisterAngle = useRef(0);
  const stressBodiesRef = useRef(null);
  const batchSize = useRef(100);
  const nextInstanceId = useRef(0);
  const stressInstances = useRef([]);
  const [stressInstancesState, setStressInstances] = useState([]);
  const heartTargets = useMemo(() => {
    const targets = [];
    const step = 0.065;

    for (let x = -1.2; x <= 1.2; x += step) {
      for (let y = -1.2; y <= 1.2; y += step) {
        const heartEquation = (x * x + y * y - 1) ** 3 - x * x * y ** 3;
        if (heartEquation <= 0) {
          targets.push([x * 3.8, 5.4 + y * 3.8, 0]);
        }
      }
    }

    return targets;
  }, []);
  const twisterUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uImpact: { value: 0 },
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
          const targetIndex = Math.floor(
            (gridIndex * heartTargets.length) / 1000,
          );
          const target = heartTargets[targetIndex];

          return {
            key: `stress-${nextInstanceId.current++}`,
            position: [
              target[0] + (Math.random() - 0.5) * 2.4,
              target[1] + 2 + Math.random() * 2.5,
              target[2] + (Math.random() - 0.5) * 2,
            ],
            rotation: [0, Math.random() * Math.PI, 0],
            scale: [0.36, 0.36, 0.36],
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
        ref={stressBodiesRef}
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
      twisterImpact.current = Math.max(0, twisterImpact.current - delta * 2.5);
      twisterMaterial.current.uniforms.uImpact.value = twisterImpact.current;
    }
    if (twisterImpactLight.current) {
      twisterImpactLight.current.intensity = twisterImpact.current * 12;
    }

    const stressBodies = stressBodiesRef.current;
    if (stressBodies) {
      stressBodies.forEach((body, index) => {
        const target =
          heartTargets[Math.floor((index * heartTargets.length) / 1000)];
        const position = body.translation();
        const velocity = body.linvel();
        const mass = body.mass();

        body.addForce(
          {
            x: (target[0] - position.x) * mass * 4 - velocity.x * mass * 2.5,
            y:
              (target[1] - position.y) * mass * 4 -
              velocity.y * mass * 2.5 +
              mass * 9.81,
            z: (target[2] - position.z) * mass * 4 - velocity.z * mass * 2.5,
          },
          true,
        );
      });
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
          friction={1}
          onCollisionEnter={() => {
            twisterImpact.current = Math.min(twisterImpact.current + 0.7, 2);
          }}>
          <CuboidCollider args={[6, 0.4, 0.4]} />
          <pointLight
            ref={twisterImpactLight}
            color="#7df9ff"
            intensity={0}
            distance={8}
            decay={2}
          />
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
