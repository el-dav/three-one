import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThreeStory } from 'assets';

import Scene from './Scene';

storiesOf('Scene', module).add('Default', () => {
  return (
    <ThreeStory>
      <Scene />
    </ThreeStory>
  );
});
