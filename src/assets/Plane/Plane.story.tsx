import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import { ThreeStory, RotateAnimation } from 'assets';

import Plane from './Plane';

storiesOf('Plane', module).add('Default', () => {
  const color = text('color', 'red');
  const width = number('width', 1);
  const height = number('height', 1);

  return (
    <ThreeStory>
      <RotateAnimation>
        <Plane width={width} height={height} color={color} />
      </RotateAnimation>
    </ThreeStory>
  );
});
