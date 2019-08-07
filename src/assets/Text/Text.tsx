import React from 'react';
import * as THREE from 'three';

global.THREE = THREE;

// tslint:disable-next-line
const createGeometry = require('three-bmfont-text');
// tslint:disable-next-line
const loadFont = require('load-bmfont');
// tslint:disable-next-line
const MSDFShader = require('three-bmfont-text/shaders/msdf');

type Props = {
  color?: string | number;
  text: string;
  fontPath?: string;
  fontImgPath?: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  vAlign?: 'top' | 'center' | 'bottom';
  scale?: number;
};

const SCALE = 400;

const Text: React.FC<Props> = ({
  text,
  color = 'white',
  fontPath = `${process.env.PUBLIC_URL}/fonts/Roboto/Roboto-Regular.json`,
  fontImgPath = `${process.env.PUBLIC_URL}/fonts/Roboto/Roboto-Regular.png`,
  width: originalWidth = 1,
  align = 'left',
  vAlign = 'top',
  scale = 1
}) => {
  const width = originalWidth * SCALE;
  const [geometry, setGeometry] = React.useState(null);
  const [material, setMaterial] = React.useState(null);
  const [fontData, setFontData] = React.useState(null);
  const [layout, setLayout] = React.useState(null);

  React.useEffect(() => {
    loadFont(fontPath, (err, font) => {
      const newGeometry = createGeometry({
        width: width / scale,
        align,
        font,
        text
      });

      // the resulting layout has metrics and bounds
      // console.log(newGeometry.layout.height);
      // console.log(newGeometry.layout.descender);

      setGeometry(newGeometry);
      setLayout(newGeometry.layout);
      setFontData(font);
    });
  }, [setGeometry, setLayout, fontPath, align, text, width, setFontData]);

  React.useEffect(() => {
    if (geometry) {
      geometry.update({
        text,
        width: width / scale,
        align
      });

      setGeometry(geometry);
      setLayout(geometry.layout);
    }
  }, [text, width, geometry, align, setLayout, setGeometry, scale]);

  React.useEffect(() => {
    if (geometry) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(fontImgPath, texture => {
        const newMaterial = new THREE.RawShaderMaterial(
          MSDFShader({
            side: THREE.DoubleSide,
            transparent: true,
            color,
            map: texture
          })
        );

        setMaterial(newMaterial);
      });
    }
  }, [geometry, fontImgPath, color]);

  if (geometry && material && fontData) {
    const { lineHeight } = fontData.common;
    const POSITION_X = -width / 2;

    const POSITION_Y =
      vAlign === 'bottom'
        ? 0
        : vAlign === 'center'
        ? -(layout.height / 2 + lineHeight / 2) * scale
        : -(layout.height + lineHeight / 2) * scale;

    return (
      <group scale={[1 / SCALE, 1 / SCALE, 1 / SCALE]}>
        <group
          position-x={POSITION_X}
          position-z={1}
          position-y={POSITION_Y}
          scale={[scale, scale, scale]}
        >
          <mesh rotation-x={Math.PI}>
            <primitive attach="geometry" object={geometry} />
            <primitive attach="material" object={material} />
          </mesh>
        </group>
      </group>
    );
  }
  return null;
};

export default Text;
