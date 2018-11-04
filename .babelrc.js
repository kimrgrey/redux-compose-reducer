const { BABEL_ENV, NODE_ENV } = process.env
const modules = BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false

module.exports = {
  presets: [['@babel/preset-env', { loose: true, modules }]],
}
