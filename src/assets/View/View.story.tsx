import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThreeStory, Plane, withLayout } from 'assets';
import { useRootYogaNode } from 'hooks';

const SCALAR = 100;

const Fill = withLayout(({ color, left, bottom, width, height, ...rest }) => {
  const pos3 = [width / 2, height / 2, 0];
  console.log(color, left, bottom, width, height);
  return (
    <Plane
      color={color}
      width={width}
      height={height}
      meshProps={{
        position: pos3
      }}
      {...rest}
    />
  );
});

const StoryContents = ({}) => {
  const rootYogaNode = useRootYogaNode();
  return (
    <layout
      scale={[1 / SCALAR, 1 / SCALAR, 1 / SCALAR]}
      ref={rootYogaNode}
      width={2 * SCALAR}
      height={2 * SCALAR}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <layout width={1 * SCALAR} height={1 * SCALAR} margin={10}>
        <Fill color="blue" />
      </layout>
      <layout width={1 * SCALAR} height={1 * SCALAR}>
        <Fill color="red" />
      </layout>
    </layout>
  );
};

storiesOf('View', module).add('Default', () => {
  return (
    <ThreeStory>
      <StoryContents />
    </ThreeStory>
  );
});
