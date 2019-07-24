import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';

import { ThreeStory } from 'assets';

import Cube from './Cube';

storiesOf('Cube', module).add('Default', () => {
  const color = text('color', 'red');
  const dimensions = object('dimensions', [1, 1, 1]) as [
    number,
    number,
    number
  ];
  const rotation = object('rotation', [90, 90, 90]) as [number, number, number];
  const position = object('position', [0, 1.5, -2]) as [number, number, number];
  return (
    <ThreeStory>
      <Cube
        color={color}
        dimensions={dimensions}
        rotation={rotation}
        meshProps={{
          position
        }}
      />
    </ThreeStory>
  );
});
