import React from 'react';
import { storiesOf } from '@storybook/react';
import { text as textKnob, number, select } from '@storybook/addon-knobs';

import { ThreeStory, Plane } from 'assets';

import Text from './Text';

storiesOf('Text', module).add('Default', () => {
  const text = textKnob(
    'text',
    `A long time ago, in a galaxy far, far away...`
  );
  const width = number('width', 2);
  const align = select('align', ['left', 'center', 'right'], 'left');
  const vAlign = select('vAlign', ['top', 'center', 'bottom'], 'top');
  const scale = number('scale', 2);
  const color = textKnob('color', 'white');

  return (
    <ThreeStory stars>
      <Plane
        width={width}
        height={0.02}
        color="red"
        meshProps={{ position: [0, 0, 0.1] }}
      />
      <Text
        color={color}
        text={text}
        width={width}
        align={align}
        vAlign={vAlign}
        scale={scale}
      />
    </ThreeStory>
  );
});
