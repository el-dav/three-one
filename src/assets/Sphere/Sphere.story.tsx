import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import { ThreeStory, RotateAnimation } from 'assets';

import Sphere from './Sphere';

storiesOf('Sphere', module).add('Default', () => {
  const color = text('color', 'red');
  const radius = number('radius', 0.5);
  const segments = number('segments', 20);

  return (
    <ThreeStory>
      <RotateAnimation>
        <Sphere color={color} radius={radius} segments={segments} />
      </RotateAnimation>
    </ThreeStory>
  );
});
