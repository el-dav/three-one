import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import { yoga } from './yogaTypes';

import { ThreeStory } from 'assets';

import View from './View';

storiesOf('View', module).add('Default', () => {
  const width = number('width', 1000);
  const height = number('height', 1000);
  const childNum = number('childNum', 2);

  const childWidth = number('childWidth', 100);
  const childHeight = number('childHeight', 100);
  return (
    <ThreeStory>
      <View
        layoutProps={{
          width,
          flexDirection: yoga.FLEX_DIRECTION_ROW,
          alignItems: yoga.ALIGN_FLEX_START,
          justifyContent: yoga.JUSTIFY_SPACE_BETWEEN,
          flexWrap: yoga.WRAP_WRAP
        }}
        color="green"
      >
        <View
          layoutProps={{
            width: childWidth,
            height: childHeight,
            margin: [yoga.EDGE_ALL, 10]
          }}
          color="yellow"
        />
        {new Array(childNum).fill(0).map((_, i) => (
          <View
            key={i}
            layoutProps={{
              width: childWidth,
              height: childHeight,
              margin: [yoga.EDGE_ALL, 10]
            }}
            color="purple"
          />
        ))}
      </View>
    </ThreeStory>
  );
});
