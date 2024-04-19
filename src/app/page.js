'use client'
import { Suspense,useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { Model } from  '../Human.jsx'

const customColors = {
  eyelash: 0x000000, // Black for eyelashes
  generic: 0xe0c9a2, // Light brown for generic skin
  pupil: 0x000000,   // Black for pupils
  humanEyes: 0x0077ff, // Blue for human eyes
  cornea: 0xffffff,  // White for cornea (sclera)
  irisV3: 0x99ccff,  // Light blue for iris
  skin3: 0xe0c9a2,   // Light brown for skin
  tongue: 0xffcccc,  // Light pink for tongue
  humanTeeth: 0xffffff, // White for human teeth
  nails: 0xffffff     // White for nails
};

export default function MyPage() {

  return <div className='h-screen w-screen'>
    <div className="relative w-full h-screen flex justify-center items-center">
        <h1 className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-3xl">Welcome to the ECG Webapp</h1>
        <div className="absolute top-0 left-0 w-full h-full">
          <Canvas className="w-full h-full">
            <Suspense fallback={null}>
              <ambientLight />
              <spotLight intensity={2} angle={0.1} penumbra={1} position={[19, 15, 19]} castShadow />
              <Model position={[0, -2, 0]} customColors={customColors} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Suspense>
          </Canvas>
        </div>
      </div>

  </div>
}
