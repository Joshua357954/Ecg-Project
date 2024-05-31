import { Html } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useState } from "react";

extend({ Html });

export const Marker = ({ position, onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };   

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedColor = event.dataTransfer.getData("color");
    onDrop(position.id, droppedColor);
    setIsDragging(false);
  };

  const markerStyle = {
    border: position.usersPick ? "2px dotted black" : "none",
    width: "1.1rem",
    height: "1.1rem",
    borderRadius: "50%",
    cursor: "default",
    position: "relative",
    backgroundColor: position.droppedColor || "transparent",
    opacity: isDragging ? 0.5 : 0.6,
  };

  return (
    <mesh position={position.coords}>
      <Html className="relative">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          style={markerStyle}
        />
      </Html>
    </mesh>
  );
};
