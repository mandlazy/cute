import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { getInput } from './util'

const entrys = getInput()

const baseConfig = {
  plugins: [
    resolve({
      extensions: ['.jsx', '.js'],
    }),
    commonjs({
      exclude: 'src/**',
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: [
        [
          '@babel/plugin-transform-runtime',
        ],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    }),
    terser(),
  ],
  external: [
    'react',
    'antd',
    './address',
  ],
}

export default Object.keys(entrys).map((key) => {
  const config = {
    input: entrys[key],
    ...baseConfig,
  }
  if (key === 'index') {
    config.output = {
      format: 'es',
      file: 'dist/index.js',
    }
    config.external = id => id.includes('./component')
  } else {
    config.output = {
      format: 'es',
      file: `dist/component/${key}/index.js`,
    }
  }
  return config
})
