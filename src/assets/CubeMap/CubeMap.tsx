import React from 'react';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber';
import { ReactThreeFiber } from 'react-three-fiber/types/three';

export type TextureUrls = [string, string, string, string, string, string];

type Props = {
  textureUrls: TextureUrls;
};
const CubeMap: React.FC<Props> = ({ textureUrls }) => {
  const ref = React.useRef<ReactThreeFiber.Node<THREE.CubeTexture>>();

  const texture = React.useMemo(
    () => new THREE.CubeTextureLoader().load(textureUrls),
    [textureUrls]
  );
  const { scene } = useThree();

  React.useEffect(() => {
    scene.background = texture;
  }, [texture, scene]);

  return <cubeTexture ref={ref} args={[textureUrls]} />;
};

export default CubeMap;
