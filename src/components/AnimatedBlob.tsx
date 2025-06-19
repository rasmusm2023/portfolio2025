"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BlobPosition {
  x: number;
  y: number;
}

interface BlobTarget {
  x: number;
  y: number;
}

const AnimatedBlob = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blobPosition, setBlobPosition] = useState<BlobPosition>({
    x: 50,
    y: 50,
  });
  const [blobTarget, setBlobTarget] = useState<BlobTarget>({ x: 50, y: 50 });
  const [heroBounds, setHeroBounds] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const animationRef = useRef<number>();
  const lastTargetTime = useRef<number>(0);
  const blobRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const randomTargetInterval = useRef<number>(Math.random() * 7000 + 8000);

  // Calculate hero section boundaries
  const updateHeroBounds = useCallback(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setHeroBounds({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  // Generate random target position within hero section
  const generateNewTarget = useCallback(() => {
    if (heroBounds.width === 0 || heroBounds.height === 0) {
      return { x: 50, y: 50 };
    }

    // Calculate position relative to hero section (10% margin from edges)
    const x = Math.random() * 80 + 10; // 10% to 90% of hero width
    const y = Math.random() * 60 + 20; // 20% to 80% of hero height
    return { x, y };
  }, [heroBounds]);

  // Calculate distance between two points
  const getDistance = useCallback(
    (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
      return Math.sqrt(
        Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
      );
    },
    []
  );

  // Check if mouse is within proximity (10% of hero section)
  const isMouseNearby = useCallback(() => {
    if (heroBounds.width === 0 || heroBounds.height === 0) return false;

    const proximityThreshold =
      Math.min(heroBounds.width, heroBounds.height) * 0.1;

    // Convert mouse position to hero-relative coordinates
    const mouseX =
      ((mousePosition.x - heroBounds.left) / heroBounds.width) * 100;
    const mouseY =
      ((mousePosition.y - heroBounds.top) / heroBounds.height) * 100;

    return (
      getDistance({ x: mouseX, y: mouseY }, blobPosition) < proximityThreshold
    );
  }, [mousePosition, blobPosition, getDistance, heroBounds]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      updateHeroBounds();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initial bounds calculation
    updateHeroBounds();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateHeroBounds]);

  useEffect(() => {
    const animate = (currentTime: number) => {
      // Generate new target every random interval (8-15 seconds)
      if (currentTime - lastTargetTime.current > randomTargetInterval.current) {
        setBlobTarget(generateNewTarget());
        lastTargetTime.current = currentTime;
        randomTargetInterval.current = Math.random() * 7000 + 8000;
      }

      // Calculate speed based on mouse proximity
      const baseSpeed = 0.005; // Base movement speed (increased from 0.002)
      const slowSpeed = 0.001; // Speed when mouse is nearby (increased from 0.0005)
      const speed = isMouseNearby() ? slowSpeed : baseSpeed;

      // Smooth movement towards target
      setBlobPosition((prev) => ({
        x: prev.x + (blobTarget.x - prev.x) * speed,
        y: prev.y + (blobTarget.y - prev.y) * speed,
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [blobTarget, isMouseNearby, generateNewTarget]);

  return (
    <div ref={heroRef} className="absolute inset-0">
      <div
        ref={blobRef}
        className="absolute pointer-events-none"
        style={{
          left: `${blobPosition.x}%`,
          top: `${blobPosition.y}%`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.1s ease-out, top 0.1s ease-out",
        }}
      >
        <div
          className="w-[500px] h-[500px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(237, 125, 255, 0.6) 0%, rgba(26, 177, 130, 0.4) 50%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBlob;
