import React from 'react';
import { Canvas } from 'react-three-fiber';
import { styled } from 'theme';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
`;

const StyledCanvas = styled(Canvas)`
  position: relative;
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const LIGHT_COLOR = 0xffffff;
const LIGHT_INTENSITY = 1;

const ThreeStory: React.FC = ({ children }) => (
  <Container>
    <StyledCanvas>
      {children}
      <directionalLight
        position={[-1, 2, 4]}
        args={[LIGHT_COLOR, LIGHT_INTENSITY]}
      />
    </StyledCanvas>
  </Container>
);

export default ThreeStory;
