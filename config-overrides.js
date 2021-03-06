const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    api: path.resolve(__dirname, './src/api'),
    hooks: path.resolve(__dirname, './src/hooks'),
    reducer: path.resolve(__dirname, './src/reducer'),
    until: path.resolve(__dirname, './src/until'),
    components: path.resolve(__dirname, './src/components')
  })
)
