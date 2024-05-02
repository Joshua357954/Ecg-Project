import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';


export function Model(props) {
  const { nodes, materials } = useGLTF('/human2.gltf')
  
  // Create a TextureLoader instance
  const textureLoader = new THREE.TextureLoader();

  return (
    <group {...props} dispose={null} scale={[3,3,3]}>
      <primitive object={nodes.root} />
      <skinnedMesh geometry={nodes.MBLab_human_male.geometry} material={materials.MBlab_eyelash} skeleton={nodes.MBLab_human_male.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_1.geometry} material={materials.MBlab_generic} skeleton={nodes.MBLab_human_male_1.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_2.geometry} material={materials.MBlab_pupil} skeleton={nodes.MBLab_human_male_2.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_3.geometry} material={materials.MBlab_human_eyes} skeleton={nodes.MBLab_human_male_3.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_4.geometry} material={materials.MBlab_cornea} skeleton={nodes.MBLab_human_male_4.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_5.geometry} material-color={'black'} material={materials.MBLab_Iris_V3} skeleton={nodes.MBLab_human_male_5.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_6.geometry} material={materials.MBLab_skin3} skeleton={nodes.MBLab_human_male_6.skeleton} >
      <meshStandardMaterial map={textureLoader.load("/texture1.jpg")} />
      </skinnedMesh>
      <skinnedMesh geometry={nodes.MBLab_human_male_7.geometry} material={materials.MBLab_tongue} skeleton={nodes.MBLab_human_male_7.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_8.geometry} material={materials.MBlab_human_teeth} skeleton={nodes.MBLab_human_male_8.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_9.geometry} material={materials.MBLab_nails} skeleton={nodes.MBLab_human_male_9.skeleton} />
    </group>
  )
}

useGLTF.preload('/human2.gltf')
