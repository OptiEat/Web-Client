const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#88d657', '@link-color':'#88d657', '@info-color':'#88d657', '@menu-item-color':'#88d657' },
  }),
);
