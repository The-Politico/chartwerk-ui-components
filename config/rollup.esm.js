import path from 'path';
import glob from 'glob';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import pkg from '../package.json';

const babelOpts = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/proposal-class-properties',
  ],
};

const commonConfig = {
  external: [
    'react',
    'react-dom',
    ...Object.keys(pkg.dependencies),
  ],
  plugins: [
    json(),
    alias({
      resolve: ['.jsx', '.js'],
      Common: path.resolve(process.cwd(), 'src/common/'),
      Components: path.resolve(process.cwd(), 'src/components/'),
      Constants: path.resolve(process.cwd(), 'src/constants/'),
      Theme: path.resolve(process.cwd(), 'src/theme/'),
    }),
    postcss({
      modules: true,
    }),
    babel(babelOpts),
    resolve({
      preferBuiltins: true,
      extensions: ['.js', '.jsx'],
      modulesOnly: true,
    }),
  ],
};

export default glob.sync('./src/components/*/index.js').map(file => {
  const componentName = file.split(path.sep).slice(-2, -1)[0];
  const config = {
    input: file,
    output: {
      file: path.resolve(process.cwd(), `dist/components/${componentName}/index.js`),
      format: 'es',
    },
  };
  return {
    ...config,
    ...commonConfig,
  };
});
