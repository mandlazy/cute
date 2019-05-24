import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
export default {
  input: './src/index',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: 'library'
  },
  plugins: [
    resolve({ extensions: ['.jsx', '.js'] }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: [
        [
          '@babel/transform-runtime',
          // { useESModules: output.format !== 'cjs' }
        ],
        ['@babel/plugin-proposal-class-properties', { "loose": true }],
        ["transform-class-properties", { "spec": true }]
      ]
    }),
    uglify(
      {
        compress: {
          drop_console: true
        }
      },
      minify
    ),
  ],
  // 是否开启代码分割
  experimentalCodeSplitting: true,
  external: id => external.some(e => id.indexOf(e) === 0)
}