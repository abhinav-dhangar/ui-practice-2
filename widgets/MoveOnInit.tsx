"use client";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
import * as THREE from "three";

interface Camera extends THREE.PerspectiveCamera {
  fov: number;
}

export default function BezierCameraAnimator({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const { camera } = useThree();
  const myCam = camera as Camera;

  useEffect(() => {
    const p0 = new THREE.Vector3(-20, 31, 60); // Start
    const p1 = new THREE.Vector3(-35, 45, 70); // Control point (tweak for curvature)
    const p2 = new THREE.Vector3(-42, 12, 54); // End

    const tVal = { t: 0 };

    const updatePosition = () => {
      const t = tVal.t;
      const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
      const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
      const z = (1 - t) ** 2 * p0.z + 2 * (1 - t) * t * p1.z + t ** 2 * p2.z;

      myCam.position.set(x, y, z);
      myCam.lookAt(0, 1, 0); // Or target of your scene
    };

    updatePosition(); // Set initial

    // Animate position along Bezier curve
    gsap.to(tVal, {
      t: 1,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: updatePosition,
      onComplete: () => {
        onComplete?.();
      },
    });

    // Animate FOV in parallel
    gsap.to(myCam, {
      fov: 64,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => myCam.updateProjectionMatrix(),
    });
  }, [myCam]);

  return null;
}
