'use client'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Model2 } from '../Human.jsx'
import * as THREE from 'three';



// const texturePaths = {
//   // 'eyelash': 'path_to_your_eyelash_texture',
//   // 'generic': '/texture.jpg',
//   // 'pupil': 'path_to_your_pupil_texture',
//   // 'humanEyes': '/eyetexture.jpg',
//   // 'cornea': 'path_to_your_cornea_texture',
//   // 'irisV3': 'path_to_your_iris_v3_texture',
//   'skin3': '/texture.jpg',
//   // 'tongue': 'path_to_your_tongue_texture',
//   // 'humanTeeth': 'path_to_your_human_teeth_texture',
//   // 'nails': 'path_to_your_nails_texture'
// };





function Model({ scale }) {
  // Define your texture paths
  const texturePaths = {
      'skin3': '/texture1.jpg',
      'irisV3': '/iristexture.jpg',
      // 'humanEyes': '/eyetexture.jpg',
  };

  // Load your GLTF model
  const gltf = useGLTF('/human.glb');

  // Load your texture images asynchronously using useLoader
  const textures = {};
  for (const part in texturePaths) {
      textures[part] = useLoader(THREE.TextureLoader, texturePaths[part]);
  }

  console.log(textures)

  // Once the model is loaded, traverse it to apply textures
  gltf.scene.traverse(function (child) {
      if (texturePaths[child.name] && textures[child.name]) {
          child.material.map = textures[child.name];
          child.material.needsUpdate = true; // Ensure material update
      }
  });

  return <primitive object={gltf.scene} scale={scale} position={[0, -2, 0]} />;
}

function MouseInteractions() {
  const { camera, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = useRef(new THREE.Vector2());

  const onMouseMove = (event) => {
    const { clientX, clientY } = event;
    mouse.current.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse.current, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      console.log(intersects);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return null;
}

export default function MyPage() {
  const [dragging, setDragging] = useState(false);
  const [droppedItems, setDroppedItems] = useState({'red':false,'blue':false,'green':false});

  const handleDrag = useCallback((e, color) => {
    setDragging(true);
    // Pass the id of the dragged item along with the drag event
    e.dataTransfer.setData('ECG', color);
    }, []);

  const handleDragOver = (e,color) => {
    e.preventDefault();
  };

  const handleDrop = (e,color) => {
    e.preventDefault();

    const draggedColor = e.dataTransfer.getData('ECG');
    if (draggedColor.toLowerCase() == color.toLowerCase()){
      console.log(draggedColor,color)
      console.log("Good to GO 🚀")
    }
    else {
      console.log('Dragged :',draggedColor,'Checker :',color)
      console.log("Wrong location 🧐")
    }

    setDroppedItems(prevState => ({
      ...prevState,
      [draggedColor]: true // or whatever value you want to set
    }));
    // Reset dragging state
    setDragging(false);
  };

  return (
    <div className='h-screen w-screen'>
      <div className="relative w-full h-screen flex justify-center items-center">
        <h1 className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-xl font-bold bg-blue-300 px-4 py-1 rounded-md">Welcome to the ECG Test Simulator</h1>
        <div className=" w-[50%] h-full mx-auto relative">
          <Canvas className="w-full h-full bg-gray-200">
            <Suspense fallback={null}>
              <ambientLight />
              <Model2 scale={[2,2,2]} position={[0, -2, 0]}/>
              <OrbitControls enableRotate={false} enablePan={true} enableZoom={true} />
              <Environment preset='sunset'/>
            </Suspense>
            <MouseInteractions/>
          </Canvas>
          
          <div className='flex gap-x-2 absolute top-44 left-48'>
            <div 
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'red': false }))} 
              className={`text-xs rounded-full w-fit p-1 bg-blackk border-dashed border-black border-[1px] ${droppedItems['red'] && 'bg-red-600'}  text-white mb-2`} 
              onDragOver={(e) => handleDragOver(e, 'red')} 
              onDrop={(e) => handleDrop(e, 'red')}
            >
              {/* {dragging ? 'DR' : 'DP!'} */}
            </div>

            <div 
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'blue': false }))} 
              className={`text-xs rounded-full w-fit p-1 bg-blackk border-dashed border-black border-[1px] ${droppedItems['blue'] && 'bg-blue-600'}  text-white mb-2`} 
              onDragOver={(e) => handleDragOver(e, 'blue')} 
              onDrop={(e) => handleDrop(e, 'blue')}
            >
              {/* {dragging ? 'DR' : 'DP!'} */}
            </div>

            <div 
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'green': false }))} 
              className={`text-xs rounded-full w-fit p-1 bg-blackk border-dashed border-black border-[1px] ${droppedItems['green'] && 'bg-green-600'}  text-white mb-2`} 
              onDragOver={(e) => handleDragOver(e, 'green')} 
              onDrop={(e) => handleDrop(e, 'green')}
            >
              {/* {dragging ? 'DR' : 'DP!'} */}
            </div>
          </div>
        </div>




        {/* Color Swatches */}
        <div className='absolute top-0 right-0 bg-blue-100 w-[25%] h-screen'>
          {/* Draggable */}
          <div draggable onDragStart={(e) => handleDrag(e,'red')} className='bg-red-200 w-fit p-2 rounded-md'>Red </div>
          <div draggable onDragStart={(e) => handleDrag(e,'blue')} className='bg-blue-200 w-fit p-2 rounded-md'>Blue </div>
          <div draggable onDragStart={(e) => handleDrag(e,'green')} className='bg-green-200 w-fit p-2 rounded-md'>Green </div>
          <div draggable onDragStart={(e) => handleDrag(e,'indigo')} className='bg-indigo-200 w-fit p-2 rounded-md'>Indigo </div>
          <div draggable onDragStart={(e) => handleDrag(e,'yellow')} className='bg-yellow-200 w-fit p-2 rounded-md'>Yellow </div>
          <div draggable onDragStart={(e) => handleDrag(e,'purple')} className='bg-purple-200 w-fit p-2 rounded-md'>Purple </div>
        
        
        </div>

        <div className='absolute top-0 left-0 bg-green-100 w-[25%] h-screen '>
          {/* Dropable */}
          {/* <div className='flex gap-x-2'>
            <div 
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'red': false }))} 
              className={`text-xs rounded-full w-fit p-1 bg-blackk border-dashed border-black border-[1px] ${droppedItems['red'] && 'bg-red-600'}  text-white mb-2`} 
              onDragOver={(e) => handleDragOver(e, 'red')} 
              onDrop={(e) => handleDrop(e, 'red')}
            >
              {dragging ? 'DR' : 'DP!'}
            </div>

            <div 
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'blue': false }))} 
              className={`text-xs rounded-full w-fit p-1 bg-blackk border-dashed border-black border-[1px] ${droppedItems['blue'] && 'bg-blue-600'}  text-white mb-2`} 
              onDragOver={(e) => handleDragOver(e, 'blue')} 
              onDrop={(e) => handleDrop(e, 'blue')}
            >
              {dragging ? 'DR' : 'DP!'}
            </div>

            <div 
              onDoubleClick={() => setDroppedItems(prevState => ({ ...prevState, 'green': false }))} 
              className={`text-xs rounded-full w-fit p-1 bg-blackk border-dashed border-black border-[1px] ${droppedItems['green'] && 'bg-green-600'}  text-white mb-2`} 
              onDragOver={(e) => handleDragOver(e, 'green')} 
              onDrop={(e) => handleDrop(e, 'green')}
            >
              {dragging ? 'DR' : 'DP!'}
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
}
