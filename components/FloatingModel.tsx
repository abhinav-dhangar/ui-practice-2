import { useFrame } from "@react-three/fiber";
import { useRef, ReactNode } from "react";
import * as THREE from "three";

export default function FloatingModel({
  children,
  position = [0, 1, 0],
  floatHeight = 0.2,
  floatSpeed = 2,
  rotationSpeed = 0.5,
}: {
  children: ReactNode;
  position?: [number, number, number];
  floatHeight?: number;
  floatSpeed?: number;
  rotationSpeed?: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const startY = position[1];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ref.current) {
      // Floating up and down
      ref.current.position.y = startY + Math.sin(t * floatSpeed) * floatHeight;

      // Gentle rotation
      // ref.current.rotation.y += rotationSpeed * 0.01;
    }
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}
