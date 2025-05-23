"use client";

import { useState } from "react";

export default function MouseTracker({
  onMouseMove,
}: {
  onMouseMove: (x: number, y: number) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "auto",
        zIndex:100
      }}
      onMouseMove={(e) => {
        // normalize mouse coords to [-1, 1] range
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        onMouseMove(x, y);
      }}
    />
  );
}
