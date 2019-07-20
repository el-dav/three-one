import React from 'react';
import { storiesOf } from '@storybook/react';

import App from './App.cmp';

storiesOf('App', module).add('Default', () => {
  return <App />;
});
