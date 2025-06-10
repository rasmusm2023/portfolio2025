import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedBox: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      // Create a GSAP animation
      gsap.to(boxRef.current, {
        duration: 1,
        x: 100,
        y: 100,
        rotation: 360,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return <div ref={boxRef} className="w-20 h-20 bg-blue-500 rounded-lg" />;
};

export default AnimatedBox;
