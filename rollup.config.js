const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const filesize = require('rollup-plugin-filesize');
const uglify = require('rollup-plugin-uglify-es');

const pkgDetails = require('./package.json');

module.exports = {
  input: 'lib/index.js',
  external: Object.keys(pkgDetails.dependencies),
  plugins: [
    commonjs(),
    resolve({
      preferBuiltins: false,
    }),
    buble(),
    filesize(),
    uglify(),
  ],
  output: {
    file: pkgDetails.main,
    format: 'umd',
    name: 'BipbopWebService',
    globals: {
      'form-data': 'FormData',
      'cross-fetch': 'fetch',
    },
  },
};
