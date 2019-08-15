import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThreeStory } from 'assets';
import { FlatButton } from 'viewAssets';
import { Hand } from 'types';

import ViveController from './ViveController';

storiesOf('ViveController', module).add('Default', () => {
  return (
    <ThreeStory stars={false} changeOrigin={false}>
      <ViveController hand={Hand.LEFT} />
      <ViveController hand={Hand.RIGHT} />
      <group position-z={-2} position-y={1}>
        <FlatButton label="Click Me" />
      </group>
    </ThreeStory>
  );
});
