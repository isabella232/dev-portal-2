module.exports = function () {
  return {
    name: 'vertex-plugin',
    configureWebpack() {
      return {
        module: {
          // Allow passing HTML from `.mdx` files to `Example` component.
          rules: [{ test: /\.html$/i, use: ['raw-loader'] }],
        },
      };
    },
  };
};
