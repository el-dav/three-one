import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThreeStory } from 'assets';

import ViveController, { HAND } from './ViveController';

storiesOf('ViveController', module).add('Default', () => {
  return (
    <ThreeStory>
      <ViveController hand={HAND.LEFT} />
      <ViveController hand={HAND.RIGHT} />
    </ThreeStory>
  );
});
