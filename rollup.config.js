import glob from 'glob';
import { basename } from 'path';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';

import { version, dependencies } from './package.json';

const sources = './src/**/*.ts';
const definitionFile = /(\.d.ts|browser.ts$)/;

const external = glob.sync(sources).filter(x => !definitionFile.test(x));
const input = Object.assign({}, ...external.map(file => ({ [basename(file, '.ts')]: file })));


export default [{
  input,
  external: Object.keys(dependencies),
  output: [
    {
      format: 'cjs',
      dir: '.',
      exports: 'default',
      sourcemap: true,
      strict: false,
    },
  ],
  watch: {
    include: sources,
  },
  plugins: [
    babel({ exclude: './node_modules/**', extensions: ['.js', '.ts'] }),
    commonjs({ extensions: ['.js', '.ts'] }),
    resolve({ preferBuiltins: false }),
    filesize(),
  ],
}, {
  input: './src/browser.ts',
  external: Object.keys(dependencies),
  output: [
    {
      banner: `/* bipbop-webservice version ${version} */`,
      footer: '/* www.bipbop.com.br */',
      name: 'bipbop',
      format: 'umd',
      file: './browser.js',
      exports: 'named',
      sourcemap: true,
      strict: false,
      globals: {
        "form-data" : 'FormData',
        "cross-fetch" : 'fetch',
      }
    },
  ],
  watch: {
    include: sources,
  },
  plugins: [
    babel({ exclude: './node_modules/**', extensions: ['.js', '.ts'] }),
    commonjs({ extensions: ['.js', '.ts'] }),
    resolve({ preferBuiltins: false }),
    filesize(),
    uglify(),
  ],
}];
