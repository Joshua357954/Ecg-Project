// 'use client'
// import { Suspense,useRef, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber'
// import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
// import * as THREE from 'three';
// import { Model } from  '../Human.jsx'

// const customColors = {
//   eyelash: 0x000000, // Black for eyelashes
//   generic: 0xe0c9a2, // Light brown for generic skin
//   pupil: 0x000000,   // Black for pupils
//   humanEyes: 0x0077ff, // Blue for human eyes
//   cornea: 0xffffff,  // White for cornea (sclera)
//   irisV3: 0x99ccff,  // Light blue for iris
//   skin3: 0xe0c9a2,   // Light brown for skin
//   tongue: 0xffcccc,  // Light pink for tongue
//   humanTeeth: 0xffffff, // White for human teeth
//   nails: 0xffffff     // White for nails
// };

// export default function MyPage() {

  // return <div className='h-screen w-screen'>
  //   <div className="relative w-full h-screen flex justify-center items-center">
  //       <h1 className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-3xl">Welcome to the ECG Webapp</h1>
  //       <div className="absolute top-0 left-0 w-full h-full">
  //         <Canvas className="w-full h-full">
  //           <Suspense fallback={null}>
  //             <ambientLight />
  //             <spotLight  />
  //             <Model position={[0, -2, 0]} customColors={customColors} />
  //             <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
  //             <Environment preset='sunset'/>
  //           </Suspense>
  //         </Canvas>
  //       </div>
  //     </div>

//   </div>
// }

'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Model({ scale }) {
  const gltf = useGLTF('/human.glb');
  
  // Texture loading
  const texture = useLoader(THREE.TextureLoader, '/texture.jpg');
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      const material = child.material;
      material.map = texture;
      material.roughness = 0.5; // Set roughness
      material.metalness = 0.5; // Set metalness
      // You can adjust other material properties as needed
    }
  });
  
  // Centering the model
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const size = boundingBox.getSize(new THREE.Vector3());
  const center = boundingBox.getCenter(new THREE.Vector3());
  gltf.scene.position.set(-center.x, -center.y + size.y / 2, -center.z);
  
  return <primitive object={gltf.scene} scale={scale} position={[0, -2, 0]} />;
}


function ColorSwatch({ color, onDrop }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'color-swatch', color }, // Ensure type is defined here
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        onDrop(dropResult.position);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: color,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    ></div>
  );
}


export default function MyPage() {
  const [selectedObject, setSelectedObject] = useState(null);

  const handleMouseDown = (event) => {
    // Logic to select object
    event.preventDefault();
    setSelectedObject(event.object);
  }

  const handleMouseMove = (event) => {
    // Update position of selected object
    if (selectedObject) {
      // Update position of selected object
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects([groundPlane]); // Assuming 'groundPlane' is a plane representing the floor
      if (intersects.length > 0) {
        selectedObject.position.copy(intersects[0].point);
      }
    }
  }

  const handleMouseUp = (event) => {
    setSelectedObject(null);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown, false);
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener('mouseup', handleMouseUp, false);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const handleSwatchDrop = (color, position) => {
    // Handle drop logic here
    // You can place the color swatch at the position on the model
    console.log(`Dropped color ${color} at position ${position}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className='h-screen w-screen'>
      <div className="relative w-full h-screen flex justify-center items-center">
        <h1 className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-xl font-bold bg-blue-300 px-4 py-1 rounded-md">Welcome to the ECG Test Simulator</h1>
        <div className="absolute top-0 left-0 w-full h-full">
          <Canvas className="w-full h-full bg-gray-700">
            <Suspense fallback={null}>
              <ambientLight />
              <spotLight  />
              <Model scale={[2, 2, 2]} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              <Environment preset='sunset'/>
            </Suspense>
          </Canvas>
          <div className="absolute top-0 left-0 flex space-x-4 p-4">
            <ColorSwatch color="red" onDrop={(position) => handleSwatchDrop("red", position)} />
            <ColorSwatch color="green" onDrop={(position) => handleSwatchDrop("green", position)} />
            <ColorSwatch color="blue" onDrop={(position) => handleSwatchDrop("blue", position)} />
          </div>
        </div>
      </div>
    </div>
    </DndProvider>
  );
}
