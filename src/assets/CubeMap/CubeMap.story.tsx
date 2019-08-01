import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThreeStory } from 'assets';

import CubeMap, { TextureUrls } from './CubeMap';

storiesOf('CubeMap', module).add('Default', () => {
  const textureUrls: TextureUrls = [
    'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
    'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
    'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
    'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
    'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
    'https://threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg'
  ];

  return (
    <ThreeStory stars={false}>
      <CubeMap textureUrls={textureUrls} />
    </ThreeStory>
  );
});
