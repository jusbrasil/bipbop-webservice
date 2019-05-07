import glob from 'glob';
import { basename } from 'path';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import sourceMaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';
import filesize from 'rollup-plugin-filesize';

import { version, dependencies } from './package.json';

const sources = './src/**/*.ts';
const definitionFile = /\.d.ts/;

const external = glob.sync(sources).filter(x => !definitionFile.test(x));
const input = Object.assign({}, ...external.map(file => ({ [basename(file, '.ts')]: file })));

export default {
  input,
  external: Object.keys(dependencies),
  output: [
    {
      banner: `/* bipbop-webservice version ${version} */`,
      footer: '/* www.bipbop.com.br */',
      format: 'cjs',
      dir: 'dist',
      exports: 'named',
      sourcemap: true,
    },
  ],
  watch: {
    include: sources,
  },
  plugins: [
    json(),
    babel({ exclude: 'node_modules/**', extensions: ['.js', '.ts'] }),
    commonjs({
      extensions: ['.js', '.ts'],
    }),
    resolve({
      preferBuiltins: false,
    }),
    sourceMaps(),
    filesize(),
  ],
};
