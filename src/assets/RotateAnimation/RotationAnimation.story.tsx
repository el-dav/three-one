import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number, boolean } from '@storybook/addon-knobs';

import { ThreeStory, Cube } from 'assets';

import RotateAnimation, { Axis } from './RotateAnimation';

storiesOf('RotationAnimation', module).add('Default', () => {
  const axis = select('axis', [Axis.X, Axis.Y, Axis.Z], Axis.X);
  const speed = number('speed', 1);
  const reverse = boolean('reverse', true);

  return (
    <ThreeStory>
      <RotateAnimation axis={axis} speed={speed} reverse={reverse}>
        <Cube />
      </RotateAnimation>
    </ThreeStory>
  );
});
