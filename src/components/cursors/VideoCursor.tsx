"use client";

import { forwardRef } from "react";
import { Play, Pause } from "@phosphor-icons/react";

interface VideoCursorProps {
  isDark: boolean;
  isPlaying: boolean;
}

const VideoCursor = forwardRef<HTMLDivElement, VideoCursorProps>(
  ({ isDark, isPlaying }, ref) => {
    return (
      <div
        ref={ref}
        className="custom-cursor"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 99999,
          width: 120,
          height: 36,
          borderRadius: "18px",
          backgroundColor: "rgb(35, 35, 35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(255, 255, 255)",
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        {isPlaying ? (
          <>
            <Pause size={16} style={{ marginRight: "4px" }} />
            <span style={{ marginLeft: "4px" }}>PAUSE</span>
          </>
        ) : (
          <>
            <Play size={16} style={{ marginRight: "4px" }} />
            <span style={{ marginLeft: "4px" }}>PLAY</span>
          </>
        )}
      </div>
    );
  }
);

VideoCursor.displayName = "VideoCursor";

export default VideoCursor;
