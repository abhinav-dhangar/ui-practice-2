"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Leva } from "leva";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

import { Model } from "@/components/Model";
import FloatingModel from "@/components/FloatingModel";
import CameraControlsPanel from "@/widgets/CameraControlPanel";
import BezierCameraAnimator from "../MoveOnInit";
import MouseTracker from "@/components/MouseTracker";

interface Camera extends THREE.PerspectiveCamera {
  fov: number;
}

// function CameraAnimator({
//   onAnimationComplete,
// }: {
//   onAnimationComplete: () => void;
// }) {
//   const { camera } = useThree();
//   const myCamera = camera as Camera;

//   useEffect(() => {
//     const p0 = new THREE.Vector3(-10, 4, -8.3);
//     const p1 = new THREE.Vector3(-8.85, 4.5, -6);
//     const p2 = new THREE.Vector3(-7.7, 1.9, -0.5);

//     const tVal = { t: 0 };

//     const updatePosition = () => {
//       const t = tVal.t;
//       const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
//       const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
//       const z = (1 - t) ** 2 * p0.z + 2 * (1 - t) * t * p1.z + t ** 2 * p2.z;

//       myCamera.position.set(x, y, z);
//       myCamera.lookAt(new THREE.Vector3(-7.7, 1.0, -0.5));
//     };

//     updatePosition();

//     gsap.to(tVal, {
//       t: 1,
//       duration: 3,
//       ease: "power2.inOut",
//       onUpdate: updatePosition,
//       onComplete: onAnimationComplete,
//     });

//     gsap.to(myCamera, {
//       fov: 28,
//       duration: 3,
//       ease: "power2.inOut",
//       onUpdate: () => myCamera.updateProjectionMatrix(),
//     });
//   }, [myCamera]);

//   return null;
// }

export default function HomePage() {
  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  return (
    <div className="relative w-screen h-screen">
      <Leva collapsed={false} />
      <MouseTracker onMouseMove={(x, y) => setMousePos({ x, y })} />
      <Canvas
        className="bg-[#dfdfdf] absolute top-0 left-0 w-full h-full" 
        shadows
        camera={{ position: [-10, 4, -8.3], fov: 38 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        <FloatingModel floatHeight={0.3} floatSpeed={1.5}>
          <Model url="/MODELS/mountain.glb" mouse={mousePos} />
        </FloatingModel>
        <BezierCameraAnimator />
        {/* <CameraAnimator onAnimationComplete={() => setControlsEnabled(true)} /> */}
        <CameraControlsPanel />

        <OrbitControls
          enabled={controlsEnabled}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
      <div className="absolute top-0 left-0 z-10 w-full p-4 flex justify-between items-center bg-white/50 backdrop-blur-xs  ">
    <h1 className="text-xl font-bold">3D Product Viewer</h1>
    <nav className="space-x-4">
      <button className="px-4 py-2 bg-black text-white rounded">Home</button>
      <button className="px-4 py-2 bg-black text-white rounded">About</button>
    </nav>
  </div>
    </div>
  );
}
