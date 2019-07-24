import React from 'react';
import { styled } from 'theme';

import { Canvas } from 'assets';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
`;

type Props = {
  canvasProps?: React.ComponentProps<typeof Canvas>;
};

const ThreeStory: React.FC<Props> = ({ children, canvasProps }) => (
  <Container>
    <Canvas {...canvasProps}>
      <ambientLight intensity={0.5} />
      <spotLight
        intensity={0.6}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
      {children}
    </Canvas>
  </Container>
);

export default ThreeStory;
