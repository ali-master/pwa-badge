module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env'];

  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
  ];

  return {
    presets,
    plugins,
    env: {
      test: {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      },
      production: {
        presets: [
          [
            '@babel/preset-env',
            { targets: { browser: 'last 1 version, >1%' } },
          ],
        ],
      },
    },
  };
};
