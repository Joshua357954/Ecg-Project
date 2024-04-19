
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/human.glb')
  return (
    <group {...props} dispose={null} scale={[2,2,1]} >
      <primitive object={nodes.root} />
      <skinnedMesh geometry={nodes.MBLab_human_male.geometry} material={materials.MBlab_eyelash} material-color={props.customColors?.eyelash} skeleton={nodes.MBLab_human_male.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_1.geometry} material={materials.MBlab_generic} material-color={props.customColors?.generic} skeleton={nodes.MBLab_human_male_1.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_2.geometry} material={materials.MBlab_pupil} material-color={props.customColors?.pupil} skeleton={nodes.MBLab_human_male_2.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_3.geometry} material={materials.MBlab_human_eyes} material-color={props.customColors?.humanEyes} skeleton={nodes.MBLab_human_male_3.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_4.geometry} material={materials.MBlab_cornea} material-color={props.customColors?.cornea} skeleton={nodes.MBLab_human_male_4.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_5.geometry} material={materials.MBlab_Iris_V3} material-color={props.customColors?.irisV3} skeleton={nodes.MBLab_human_male_5.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_6.geometry} material={materials.MBlab_skin3} material-color={props.customColors?.skin3} skeleton={nodes.MBLab_human_male_6.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_7.geometry} material={materials.MBLab_tongue} material-color={props.customColors?.tongue} skeleton={nodes.MBLab_human_male_7.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_8.geometry} material={materials.MBlab_human_teeth} material-color={props.customColors?.humanTeeth} skeleton={nodes.MBLab_human_male_8.skeleton} />
      <skinnedMesh geometry={nodes.MBLab_human_male_9.geometry} material={materials.MBLab_nails} material-color={props.customColors?.nails} skeleton={nodes.MBLab_human_male_9.skeleton} />
    </group>
  )
}

useGLTF.preload('/human.glb')
