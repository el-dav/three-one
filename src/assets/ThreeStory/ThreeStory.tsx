import React from 'react';
import { styled } from 'theme';

import { Canvas, PerspectiveCamera, Stars } from 'assets';
import { useRender } from 'react-three-fiber';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
`;

type Props = {
  canvasProps?: React.ComponentProps<typeof Canvas>;
};

const ThreeStory: React.FC<Props> = ({ children, canvasProps }) => {
  return (
    <Container>
      <Canvas
        camera={{
          fov: 75,
          aspect: 2,
          near: 0.1,
          far: 1000,
          position: [2, 2, 2]
        }}
        {...canvasProps}
      >
        <StoryContents>{children}</StoryContents>
      </Canvas>
    </Container>
  );
};

type RenderProps = {
  camera: THREE.PerspectiveCamera;
  gl: THREE.WebGLRenderer;
  scene: THREE.Scene;
};
const StoryContents: React.FC = ({ children }) => {
  useRender(({ camera, gl, scene }: RenderProps) => {
    camera.position.setZ(camera.position.z + 0.001);
    console.log(camera);
    gl.render(scene, camera);
  }, true);

  return (
    <scene>
      <ambientLight intensity={0.5} />
      <spotLight
        intensity={0.6}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
      <Stars />
      {children}
    </scene>
  );
};

export default ThreeStory;
