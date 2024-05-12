"use client";

import React, { useState } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { Environment, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Toaster, toast } from "react-hot-toast";

extend({ Html });

const Marker = ({ position, color, onDrop }) => {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedColor = event.dataTransfer.getData("color");
    onDrop(color === droppedColor);
  };

  return (
    <mesh className="cursor-pointer relative" position={position}>
      <Html>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color={color} />
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          // style={{ backgroundColor: "gray" }}
          className={`border-2 border-dotted border-black absolute top-0 left-0 w-5 h-5 rounded-full`}
        ></div>
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
      className="w-8 h-8 rounded-full m-2"
      draggable
      onDragStart={handleDragStart}
      style={{ backgroundColor: color }}
    ></div>
  );
};

const Model = ({ src, rotate }) => {
  const { scene } = useGLTF(src);

  const positions = [
    { x: -0.45, y: 1.79, z: 0.44, color: "red" },
    { x: -0.1, y: 2.01, z: 0.49, color: "blue" },
    { x: 0.33, y: 1.92, z: 0.5, color: "green" },
    { x: 0.43, y: 1.49, z: 0.34, color: "yellow" },
    { x: 0.21, y: 1.24, z: 0.46, color: "orange" },
    { x: 0.0, y: 1.45, z: 0.51, color: "purple" },
    { x: -0.2, y: 1.01, z: 0.48, color: "cyan" },
    { x: -0.43, y: 1.03, z: 0.34, color: "magenta" },
  ];

  return (
    <>
      {scene && (
        <primitive object={scene} scale={[3, 3, 3]} position={[0, -3, 0]} rotation-y={rotate} />
      )}
      {positions.map((position, index) => (
        <Marker
          key={index}
          position={[position.x, position.y, position.z]}
          color={position.color}
          onDrop={(isCorrect) =>
            toast(isCorrect ? "Correct Position!" : "Incorrect Position!", {
              icon: isCorrect  ? "🎉" : "😢",
            })
          }
        />
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
            <Environment preset='sunset' />
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
