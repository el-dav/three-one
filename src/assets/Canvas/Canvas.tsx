import React from 'react';
import { Canvas as ThreeCanvas } from 'react-three-fiber';

import { WEBVR } from 'vr';
import { Stars } from 'assets';

type Props = React.ComponentProps<typeof ThreeCanvas>;

const Canvas: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <ThreeCanvas
      vr
      style={{ background: '#272727' }}
      onCreated={({ gl }: any) => {
        document.body.appendChild(WEBVR.createButton(gl));
      }}
      {...rest}
    >
      <Stars />
      {children}
    </ThreeCanvas>
  );
};

export default Canvas;
