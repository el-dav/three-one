import React from 'react';
import { storiesOf } from '@storybook/react';

import ThreeStory from './ThreeStory';

storiesOf('ThreeStory', module).add('Default', () => {
  return <ThreeStory />;
});
