import React, { useEffect } from 'react';
import GLTFLoader from 'three-gltf-loader';
import { AnimationClip, Camera, Scene } from 'three';
import { ReactThreeFiber } from 'react-three-fiber/types/three';

import { Cube } from 'assets';

type GLTF = {
  animations: AnimationClip[];
  scene: Scene;
  scenes: Scene[];
  cameras: Camera[];
  asset: object;
};

type Props = ReactThreeFiber.Object3DNode<any> & {
  url: string;
};
const GltfModel: React.FC<Props> = ({ children, url, ...rest }) => {
  const [model, setModel] = React.useState<GLTF | null>(null);

  const loadGTLF = async (modelUrl: string) => {
    const gltf = await new Promise<GLTF>(async resolve =>
      new GLTFLoader().load(modelUrl, resolve)
    );
    setModel(gltf);
  };

  useEffect(() => {
    loadGTLF(url);
  }, [url]);

  return model ? (
    <primitive object={model.scene} {...rest}>
      {children}
    </primitive>
  ) : (
    <Cube />
  );
};

export default GltfModel;
