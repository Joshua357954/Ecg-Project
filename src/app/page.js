"use client";
import React, { useState, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Environment, Html, useGLTF } from "@react-three/drei";
import { Toaster, toast } from "react-hot-toast";
import * as THREE from "three";

extend({ Html });

const Marker = ({ position, onDrop }) => {
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
    width: "1.3rem",
    height: "1.3rem",
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

const Swatch = ({ color, isDisabled }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("color", color);
  };

  return (
    <div
      className={`w-4 h-4 rounded-full m-2 ${isDisabled ? "opacity-50" : ""}`}
      draggable={!isDisabled}
      onDragStart={handleDragStart}
      style={{
        backgroundColor: color,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    ></div>
  );
};

const Model = ({ src, rotate, positions, onDrop }) => {
  const { scene } = useGLTF(src);

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
        <Marker key={position.id} position={position} onDrop={onDrop} />
      ))}
    </>
  );
};

const ThreeScene = () => {
  const initialColors = [
    { color: "red", isDisabled: false },
    { color: "blue", isDisabled: false },
    { color: "green", isDisabled: false },
    { color: "yellow", isDisabled: false },
    { color: "orange", isDisabled: false },
    { color: "purple", isDisabled: false },
    { color: "cyan", isDisabled: false },
    { color: "magenta", isDisabled: false },
  ];

  const initialPositions = [
    {
      id: 1,
      coords: [-0.45, 1.79, 0.44],
      defaultColor: "red",
      droppedColor: null,
      usersPick: false,
    },
    {
      id: 2,
      coords: [-0.1, 2.01, 0.49],
      defaultColor: "blue",
      droppedColor: null,
      usersPick: false,
    },
    {
      id: 3,
      coords: [0.33, 1.92, 0.5],
      defaultColor: "green",
      droppedColor: null,
      usersPick: false,
    },
    {
      id: 4,
      coords: [0.33, 1.49, 0.34],
      defaultColor: "yellow",
      droppedColor: null,
      usersPick: false,
    },
    {
      id: 5,
      coords: [0.11, 1.24, 0.46],
      defaultColor: "orange",
      droppedColor: null,
      usersPick: false,
    },
    {
      id: 6,
      coords: [0.0, 1.45, 0.51],
      defaultColor: "purple",
      droppedColor: null,
      usersPick: false,
    },
    {
      id: 7,
      coords: [-0.2, 1.01, 0.48],
      defaultColor: "cyan",
      droppedColor: null,
      usersPick: false,
    },
    {
      id: 8,
      coords: [-0.43, 1.03, 0.34],
      defaultColor: "magenta",
      droppedColor: null,
      usersPick: false,
    },
  ];

  const [rotate, setRotate] = useState(0);
  const [colors, setColors] = useState(initialColors);
  const [positions, setPositions] = useState(initialPositions);
  const [allMarkersFilled, setAllMarkersFilled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const rotateLeft = () => {
    // setRotate((prevRotate) => prevRotate - 0.1); /still needed
  };

  const rotateRight = () => {
    // setRotate((prevRotate) => prevRotate + 0.1); /still needed
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode state
  };

  const handleDrop = (id, droppedColor) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.id === id ? { ...position, droppedColor } : position
      )
    );
    setColors((prevColors) =>
      prevColors.map((colorObj) =>
        colorObj.color === droppedColor
          ? { ...colorObj, isDisabled: true }
          : colorObj
      )
    );
  };

  const handleReset = () => {
    setPositions(initialPositions);
    setColors(initialColors);
    setAllMarkersFilled(false);
    setShowModal(false);
    toast.success("Successfully reset!");
  };

  const handleCheckCompletion = () => {
    const isAllFilled = positions.every(
      (position) => position.droppedColor !== null
    );
    setAllMarkersFilled(isAllFilled);
    if (isAllFilled) {
      var updatedPositions = positions.map((position) => ({
        ...position,
        usersPick: position.defaultColor === position.droppedColor,
      }));
      setPositions(updatedPositions);
      setShowModal(true);
    }
  };

  useEffect(() => {
    handleCheckCompletion();
  }, [positions]);

  useEffect(() => {
    // Update CSS classes based on mode
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen w-screen">
      <Toaster />
      <div className="relative w-full h-screen flex justify-center items-center">
        <div className="w-[50%] h-full mx-auto relative">
          <Canvas className="w-full h-full absolute top-0 left-0">
            <ambientLight intensity={isDarkMode ? 0.2 : 0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Model
              src="/human.glb"
              rotate={rotate}
              positions={positions}
              onDrop={handleDrop}
            />
            <Environment preset={isDarkMode ? "night" : "sunset"} />
          </Canvas>
        </div>

        <div className="absolute top-0 right-0 bg-white w-[25%] h-screen">
          <div className="pt-5 w-full flex flex-col items-center gap-5">
            <p className="font-semibold bg-gray-200 px-2 rounded-lg py-1 text-xl">
              Pick an Electrode
            </p>
            {colors.map((colorObj, index) => (
              <Swatch
                key={index}
                color={colorObj.color}
                isDisabled={colorObj.isDisabled}
              />
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
              onClick={handleReset}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
            >
              Reset
            </button>
            <button
              onClick={rotateRight}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-end flex-col pb-10 bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white z-30 p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Markers Status</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {positions.map((position, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      position.droppedColor === position.defaultColor
                        ? "bg-green-500"
                        : "bg-red-400"
                    }`}
                  >
                    <span className="text-white text-sm">
                      {position.droppedColor === position.defaultColor
                        ? "✔️"
                        : "❌"}
                    </span>
                  </div>
                  <strong>Pos {index + 1}</strong>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleReset()}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
