import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface MousePos {
  x: number;
  y: number;
}

export function Model({ mouse, url }: { url: string; mouse: MousePos }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (modelRef.current) {
      const targetY = mouse.x * Math.PI * 0.01; // gentle rotation (smaller factor)
      modelRef.current.rotation.y +=
        (targetY - modelRef.current.rotation.y) * 0.01; // smooth lerp
      modelRef.current.rotation.x = 0; // lock X rotation
    }
  });
  return <primitive object={scene} ref={modelRef} />;
}
