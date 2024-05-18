"use client";

import React, { useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Environment, Html, useGLTF } from "@react-three/drei";
import { Toaster, toast } from "react-hot-toast";
import * as THREE from "three";

extend({ Html });

const Marker = ({ position, onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentColor, setCurrentColor] = useState(position.defaultColor);

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
    setCurrentColor(droppedColor);
    onDrop(position.id, position.color === droppedColor);
    setIsDragging(false);
  };

  const markerStyle = {
    border: "2px dotteds black",
    width: "1.3rem",
    height: "1.3rem",
    borderRadius: "50%",
    cursor: "default",
    backgroundColor: currentColor,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <mesh position={position.coords}>
      <Html>
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

const Swatch = ({ color }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("color", color);
  };

  return (
    <div
      className="w-4 h-4 rounded-full m-2"
      draggable
      onDragStart={handleDragStart}
      style={{ backgroundColor: color }}
    ></div>
  );
};

const Model = ({ src, rotate }) => {
  const { scene } = useGLTF(src);

  const [positions, setPositions] = useState([
    { id: 1, coords: [-0.45, 1.79, 0.44], color: "red", defaultColor: "" },
    { id: 2, coords: [-0.1, 2.01, 0.49], color: "blue", defaultColor: "" },
    { id: 3, coords: [0.33, 1.92, 0.5], color: "green", defaultColor: "" },
    { id: 4, coords: [0.43, 1.49, 0.34], color: "yellow", defaultColor: "" },
    { id: 5, coords: [0.21, 1.24, 0.46], color: "orange", defaultColor: "" },
    { id: 6, coords: [0.0, 1.45, 0.51], color: "purple", defaultColor: "" },
    { id: 7, coords: [-0.2, 1.01, 0.48], color: "cyan", defaultColor: "" },
    { id: 8, coords: [-0.43, 1.03, 0.34], color: "magenta", defaultColor: "" },
  ]);

  const handleDrop = (id, isCorrect) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.id === id
          ? {
              ...position,
              currentColor: isCorrect ? position.color : position.defaultColor,
            }
          : position
      )
    );

    toast(isCorrect ? "Correct Position!" : "Incorrect Position!", {
      icon: isCorrect ? "🎉" : "😢",
    });
  };

  return (
    <>
      {scene && (
        <primitive
          object={scene}
          scale={[3, 3, 3]}
          position={[0, -3, 0]}
          rotation-y={rotate}
        />
      )}
      {positions.map((position) => (
        <Marker key={position.id} position={position} onDrop={handleDrop} />
      ))}
    </>
  );
};

const ThreeScene = () => {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "cyan",
    "magenta",
  ];

  const [rotate, setRotate] = useState(0);

  const rotateLeft = () => {
    setRotate((prevRotate) => prevRotate - 0.1);
  };

  const rotateRight = () => {
    setRotate((prevRotate) => prevRotate + 0.1);
  };

  return (
    <div className="h-screen w-screen">
      <Toaster />
      <div className="relative w-full h-screen flex justify-center items-center">
        <div className="w-[50%] h-full mx-auto relative">
          <Canvas className="w-full h-full absolute top-0 left-0">
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Model src="/human.glb" rotate={rotate} />
            <Environment preset="sunset" />
          </Canvas>
        </div>

        <div className="absolute top-0 right-0 bg-white w-[25%] h-screen">
          <div className="pt-5 w-full flex flex-col items-center gap-5">
            <p className="font-semibold bg-gray-200 px-2 rounded-lg py-1 text-xl">
              Pick an Electrode
            </p>
            {colors.map((color, index) => (
              <Swatch key={index} color={color} />
            ))}
          </div>
        </div>

        <div className="absolute top-0 left-0 flex flex-col items-center bg-white w-[25%] h-screen">
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-center text-3xl mb-1 font-semibold">
              ECG TEST
            </h1>
            <span className="px-2 text-sm py-1 font-medium rounded-lg bg-gray-200 text-center">
              Simulator
            </span>
          </div>
          <div className="flex flex-col items-center mt-10">
            <button
              onClick={rotateLeft}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
            >
              Rotate Left
            </button>
            <button
              onClick={rotateRight}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Rotate Right
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeScene;
