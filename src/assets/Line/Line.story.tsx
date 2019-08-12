import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';

import { ThreeStory } from 'assets';

import Line from './Line';

const VERTICES = [[-3, 0, 0], [3, 0, 0], [3, 1, 0]] as Array<
  [number, number, number]
>;

storiesOf('Line', module).add('Default', () => {
  const color = text('color', 'red');
  const vertices = object('vertices', VERTICES);

  return (
    <ThreeStory>
      <Line color={color} vertices={vertices} />
    </ThreeStory>
  );
});
