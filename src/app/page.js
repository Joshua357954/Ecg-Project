'use client'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Model } from '../Human2.jsx'
import * as THREE from 'three';
import { Toaster, toast } from 'react-hot-toast';

export default function MyPage() {
  const [modelRotationY, setModelRotationY] = useState(0);
  const [droppedItems, setDroppedItems] = useState({ 'red': false, 'blue': false, 'green': false });
  const [leftClicks, setLeftClicks] = useState(0);
  const [rightClicks, setRightClicks] = useState(0);

  const handleDrag = (e, color) => {
    e.dataTransfer.setData('ECG', color);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, color) => {
    e.preventDefault();

    const draggedColor = e.dataTransfer.getData('ECG');
    if (draggedColor.toLowerCase() === color.toLowerCase()) {
      setDroppedItems(prevState => ({ ...prevState, [draggedColor]: true }));
      toast(`Dropped ${color} in the right location! 🚀`);
    } else {
      toast.error(`Dropped ${draggedColor} in the wrong location! 🧐`);
    }
  };

  const rotateLeft = () => {
    setLeftClicks(prev => prev + 1);
    setModelRotationY(prev => prev - 0.1);
  };

  const rotateRight = () => {
    setRightClicks(prev => prev + 1);
    setModelRotationY(prev => prev + 0.1);
  };

  return (
    <div className='h-screen w-screen'>
      <Toaster />
      <div className="relative w-full h-screen flex justify-center items-center">
        <div className=" w-[50%] h-full mx-auto relative">
          <Canvas className="w-full h-full bg-gray-200">
            <Suspense fallback={null}>
              <ambientLight />
              <Model scale={[3, 3, 3]} position={[0, -3, 0]} rotation={[0, modelRotationY, 0]} />
              <OrbitControls enableRotate={false} enablePan={true} enableZoom={true} />
              <Environment preset='sunset' />
            </Suspense>
          </Canvas>

          <div className='flex gap-x-2 absolute top-44 left-48'>
            <div
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'red': false }))}
              className={`text-xs rounded-full w-fit p-2 bg-blackk border-dashed border-black border-[1px] ${droppedItems['red'] && 'bg-red-600'}  text-white mb-2`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'red')}
            >
              {/* {dragging ? 'DR' : 'DP!'} */}
            </div>

            <div
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'blue': false }))}
              className={`text-xs rounded-full w-fit p-2 bg-blackk border-dashed border-black border-[1px] ${droppedItems['blue'] && 'bg-blue-600'}  text-white mb-2`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'blue')}
            >
              {/* {dragging ? 'DR' : 'DP!'} */}
            </div>

            <div
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'green': false }))}
              className={`text-xs rounded-full w-fit p-2 bg-blackk border-dashed border-black border-[1px] ${droppedItems['green'] && 'bg-green-600'}  text-white mb-2`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'green')}
            >
              {/* {dragging ? 'DR' : 'DP!'} */}
            </div>
          </div>
        </div>

        {/* Draggable */}
        <div className='absolute top-0 right-0 bg-white w-[25%] h-screen'>
          <div className='pt-5 w-full flex flex-col items-center gap-7'>
            <p className='font-semibold bg-gray-200 px-2 rounded-lg py-1 text-xl'> Pick an Electrode</p>

            <div draggable onDragStart={(e) => handleDrag(e, 'red')} className='bg-red-400 w-fit p-4 rounded-md'></div>
            <div draggable onDragStart={(e) => handleDrag(e, 'blue')} className='bg-blue-400 w-fit p-4 rounded-md'></div>
            <div draggable onDragStart={(e) => handleDrag(e, 'green')} className='bg-green-400 w-fit p-4 rounded-md'></div>
            <div draggable onDragStart={(e) => handleDrag(e, 'indigo')} className='bg-indigo-400 w-fit p-4 rounded-md'> </div>
            <div draggable onDragStart={(e) => handleDrag(e, 'yellow')} className='bg-yellow-400 w-fit p-4 rounded-md'></div>
            <div draggable onDragStart={(e) => handleDrag(e, 'purple')} className='bg-purple-400 w-fit p-4 rounded-md'> </div>
          </div>
        </div>

        <div className='absolute top-0 left-0 flex flex-col items-center bg-white w-[25%] h-screen '>
          <div className='mt-4 flex flex-col items-center'>
            <h1 className='text-center text-3xl mb-1 font-semibold'>ECG TEST</h1>
            <span className='px-2 text-sm py-1 font-medium rounded-lg bg-gray-200 text-center'>Simulator</span>
          </div>
          <div className="flex flex-col items-center mt-10">
            <button onClick={rotateLeft} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2">Rotate Left</button>
            <button onClick={rotateRight} className="bg-blue-500 text-white px-4 py-2 rounded-md">Rotate Right</button>
          </div>
        </div>
      </div>
    </div>
  );
}
