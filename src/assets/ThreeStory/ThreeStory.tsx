import React from 'react';
import { styled } from 'theme';

import { Canvas, Stars, ControllerProvider } from 'assets';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
`;

type Props = {
  canvasProps?: React.ComponentProps<typeof Canvas>;
  stars?: boolean;
  changeOrigin?: boolean;
};

const ThreeStory: React.FC<Props> = ({
  children,
  canvasProps,
  stars,
  changeOrigin
}) => {
  return (
    <Container>
      <Canvas
        camera={{
          fov: 75,
          aspect: 2,
          near: 0.1,
          far: 1000
        }}
        {...canvasProps}
      >
        <StoryContents stars={stars} changeOrigin={changeOrigin}>
          {children}
        </StoryContents>
      </Canvas>
    </Container>
  );
};

type ContentsProps = {
  stars?: boolean;
  changeOrigin?: boolean;
};
const StoryContents: React.FC<ContentsProps> = ({
  children,
  stars = true,
  changeOrigin = true
}) => {
  return (
    <ControllerProvider>
      <ambientLight intensity={0.5} />
      <spotLight
        intensity={0.6}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
      {stars && <Stars />}
      <group position={changeOrigin ? [0, 1.5, -2] : [0, 0, 0]}>
        {children}
      </group>
    </ControllerProvider>
  );
};

export default ThreeStory;
