import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThreeStory } from 'assets';

import FlatButton from './FlatButton';

storiesOf('FlatButton', module).add('Default', () => {
  return (
    <ThreeStory>
      <FlatButton label="Click Me" />
    </ThreeStory>
  );
});
