"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Model } from "@/components/Model";
import FloatingModel from "@/components/FloatingModel";

interface Camera extends THREE.PerspectiveCamera {
  fov: number;
}
function SpinningBox() {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const rotationDelta = useRef({ x: 0, y: 0 });
  const { size, camera, scene } = useThree();

  // Raycaster setup
  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates
      mouse.x = (event.clientX / size.width) * 2 - 1;
      mouse.y = -(event.clientY / size.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.some((i) => i.object === ref.current)) {
        setHovered(true);
        rotationDelta.current.x = -0.01;
        rotationDelta.current.y = -0.01;
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, scene, size]);

  // Smooth rotation while hovered
  useFrame(() => {
    if (!ref.current || !hovered) return;

    ref.current.rotation.x += rotationDelta.current.x;
    ref.current.rotation.y += rotationDelta.current.y;

    rotationDelta.current.x *= 0.9;
    rotationDelta.current.y *= 0.9;
  });

  return (
    <mesh ref={ref} position={[0, 1, 0]} castShadow>
      <FloatingModel floatHeight={0.3} floatSpeed={1.5}>
        <Model url="/MODELS/mountain.glb" />
      </FloatingModel>
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
  const myCamera = camera as Camera;

  // Setup Leva controls
  const [, set] = useControls("Camera", () => ({
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
      value: myCamera.fov,
      step: 1,
      onChange: (v) => {
        myCamera.fov = v;
        myCamera.updateProjectionMatrix();
      },
    },
  }));

  // Sync Leva UI with camera values every frame
  useFrame(() => {
    set({
      camX: myCamera.position.x,
      camY: myCamera.position.y,
      camZ: myCamera.position.z,
      fov: myCamera.fov,
    });

    // Optional: always look at spinning box
    myCamera.lookAt(0, 1, 0);
  });

  useEffect(() => {
    const myCam = myCamera as Camera;

    const p0 = new THREE.Vector3(-10, 4, -8.3); // Start
    const p1 = new THREE.Vector3(-8.85, 4.5, -6); // Control (adjust as needed)
    const p2 = new THREE.Vector3(-7.7, 1.9, -0.5); // Destination

    const tVal = { t: 0 };

    const updatePosition = () => {
      const t = tVal.t;
      const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
      const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
      const z = (1 - t) ** 2 * p0.z + 2 * (1 - t) * t * p1.z + t ** 2 * p2.z;

      myCam.position.set(x, y, z);
      myCam.lookAt(new THREE.Vector3(-7.7, 1.0, -0.5)); // Look at a target
    };

    // Run initial position set
    updatePosition();

    // Animate from start to destination
    gsap.to(tVal, {
      t: 1,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: updatePosition,
      onComplete: () => {
        onAnimationComplete();
      },
    });

    // Optionally animate FOV
    gsap.to(myCam, {
      fov: 28,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => myCam.updateProjectionMatrix(),
    });
  }, [myCamera]);

  return null;
}

export default function HomePage() {
  const [controlsEnabled, setControlsEnabled] = useState(false);

  return (
    <div className="w-screen h-screen">
      <Leva collapsed={false} />
      <Canvas
        className="bg-[#dfdfdf]"
        shadows
        camera={{ position: [-10, 4, -8.3], fov: 38 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        {/* <SpinningBox/> */}
        <FloatingModel floatHeight={0.3} floatSpeed={1.5}>
          <Model url="/MODELS/mountain.glb" />
        </FloatingModel>
        {/* <Ground /> */}
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
