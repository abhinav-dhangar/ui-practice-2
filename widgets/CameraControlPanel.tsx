"use client";

import { useControls } from "leva";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

interface Camera extends THREE.PerspectiveCamera {
  fov: number;
}

export default function CameraControlsPanel() {
  const { camera } = useThree();
  const myCamera = camera as Camera;

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

  useFrame(() => {
    set({
      camX: myCamera.position.x,
      camY: myCamera.position.y,
      camZ: myCamera.position.z,
      fov: myCamera.fov,
    });

    // Optional: make camera look at a fixed point
    myCamera.lookAt(0, 1, 0);
  });

  return null;
}
