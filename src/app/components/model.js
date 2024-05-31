import { useGLTF } from "@react-three/drei";
import { Marker } from "./marker";

export const Model = ({ src, rotate, positions, onDrop }) => {
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
