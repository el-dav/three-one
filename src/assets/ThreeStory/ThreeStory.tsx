import React from 'react';
import { styled } from 'theme';

import { Canvas, Stars } from 'assets';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
`;

type Props = {
  canvasProps?: React.ComponentProps<typeof Canvas>;
  stars?: boolean;
};

const ThreeStory: React.FC<Props> = ({ children, canvasProps, stars }) => {
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
        <StoryContents stars={stars}>{children}</StoryContents>
      </Canvas>
    </Container>
  );
};

type ContentsProps = {
  stars?: boolean;
};
const StoryContents: React.FC<ContentsProps> = ({ children, stars = true }) => {
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
      {stars && <Stars />}
      <group position={[0, 1.5, -2]}>{children}</group>
    </scene>
  );
};

export default ThreeStory;
