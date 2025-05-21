// components/ModelViewer.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

function Model() {
  const gltf = useGLTF("/MODELS/sharkWeapon.glb");
  return <primitive object={gltf.scene} />;
}

export function SharkWEaponModel() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
}
