import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThreeStory, RotateAnimation, Axis } from 'assets';

import GltfModel from './GltfModel';

const Croc = () => (
  <GltfModel url={`${process.env.PUBLIC_URL}/models/croc.gltf`} />
);

const Piggy = () => (
  <GltfModel url={`${process.env.PUBLIC_URL}/models/piggy bank.gltf`} />
);

const getAxis = () => {
  const num = Math.random();
  if (num > 0.3) {
    return Axis.X;
  } else if (num > 0.6) {
    return Axis.Y;
  }
  return Axis.Z;
};

const getModel = (Model, key) => {
  const position = [
    Math.random() * 50 - 25,
    Math.random() * 50 - 25,
    Math.random() * 50 - 25
  ];
  const axis = getAxis();
  const speed = Math.random() * 30;
  const reverse = Math.random() > 0.5 ? true : false;

  return (
    <group key={key} position={position}>
      <RotateAnimation axis={axis} speed={speed} reverse={reverse}>
        <Model />
      </RotateAnimation>
    </group>
  );
};

const Animals = new Array(1000)
  .fill(0)
  .map((num, i) => getModel(Math.random() > 0.5 ? Croc : Piggy, i));

storiesOf('GltfModel', module)
  .add('Default', () => {
    return (
      <ThreeStory>
        <Piggy />
      </ThreeStory>
    );
  })
  .add('Spinning', () => {
    return (
      <ThreeStory>
        <RotateAnimation axis={Axis.Y} speed={10}>
          <Piggy />
        </RotateAnimation>
      </ThreeStory>
    );
  })
  .add('Many', () => {
    return <ThreeStory stars={false}>{Animals}</ThreeStory>;
  });
