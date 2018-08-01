import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV
const config = {
  input: 'src/index.js',
  plugins: [babel()],
}

if (env === 'es' || env === 'cjs') {
  config.output = { format: env, indent: false }
}

if (env === 'development' || env === 'production') {
  config.output = { format: 'umd', name: 'ReduxComposeReducer', indent: false }
  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    })
  )
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  )
}

export default config
