"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

interface Camera extends THREE.PerspectiveCamera {
  fov: number;
}

function SpinningBox() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
  });

  return (
    <mesh ref={ref} position={[0, 1, 0]} castShadow>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
}

function CameraAnimator({
  onAnimationComplete,
}: {
  onAnimationComplete: () => void;
}) {
  const { camera } = useThree();
const myCamera  = camera as Camera; // Type assertion to Camera

  // Optional Leva controls for tweaking in real time
  useControls("Camera", {
    camX: {
      value: myCamera.position.x,
      step: 0.1,
      onChange: (v) => (myCamera.position.x = v),
    },
    camY: {
      value: myCamera.position.y,
      step: 0.1,
      onChange: (v) => (myCamera.position.y = v),
    },
    camZ: {
      value: myCamera.position.z,
      step: 0.1,
      onChange: (v) => (myCamera.position.z = v),
    },
    fov: {
      value: myCamera?.fov,
      step: 1,
      onChange: (v) => {
        myCamera.fov = v;
        myCamera.updateProjectionMatrix();
      },
    },
  });

  useEffect(() => {
    myCamera.position.set(-10, 4, -8.3);
    myCamera.fov = 38;
    myCamera.updateProjectionMatrix();

    const tl = gsap.timeline({ delay: 1 });

    tl.to(myCamera.position, {
      x: -5.4,
      y: 1.8,
      z: -0.5,
      duration: 3,
      ease: "power2.inOut",
    }).to(
      myCamera,
      {
        fov: 28,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => myCamera.updateProjectionMatrix(),
        onComplete: () => {
          onAnimationComplete(); // Notify when animation is done
        },
      },
      "<"
    );
  }, [myCamera]);

  useFrame(() => {
    myCamera.lookAt(0, 1, 0); // Focus on the spinning box
  });

  return null;
}

export default function HomePage() {
  const [controlsEnabled, setControlsEnabled] = useState(false);
  return (
    <div className="w-screen h-screen">
      <Leva collapsed={false} />
      <Canvas shadows camera={{ position: [-10, 4, -8.3], fov: 38 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <SpinningBox />
        <Ground />
        <CameraAnimator onAnimationComplete={() => setControlsEnabled(true)} />
        <OrbitControls
          enabled={controlsEnabled}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
    </div>
  );
}
