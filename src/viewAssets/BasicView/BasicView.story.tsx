import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import { yoga } from 'types';
import { ThreeStory } from 'assets';
import { Fill } from 'viewAssets';

import BasicView from './BasicView';

storiesOf('BasicView', module).add('Default', () => {
  const width = number('width', 1000);
  const childNum = number('childNum', 2);

  const childWidth = number('childWidth', 100);
  const childHeight = number('childHeight', 100);
  return (
    <ThreeStory stars>
      <BasicView
        width={width}
        flexDirection={yoga.FLEX_DIRECTION_ROW}
        alignItems={yoga.ALIGN_FLEX_START}
        justifyContent={yoga.JUSTIFY_SPACE_BETWEEN}
        flexWrap={yoga.WRAP_WRAP}
      >
        <Fill color="green" />
        <BasicView
          width={childWidth}
          height={childHeight}
          margin={[yoga.EDGE_ALL, 10]}
        >
          <Fill color="yellow" />
        </BasicView>

        {new Array(childNum).fill(0).map((_, i) => (
          <BasicView
            key={i}
            width={childWidth}
            height={childHeight}
            margin={[yoga.EDGE_ALL, 10]}
          >
            <Fill color="purple" />
          </BasicView>
        ))}
      </BasicView>
    </ThreeStory>
  );
});
