// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// module.exports = {
//   css: {
//     loaderOptions: {
//       postcss: {
//         plugins: [
//           require('postcss-pxtorem')({
//             rootValue: 16,
//             propList: ['*']
//           }),
//         ],
//       },
//     },
//   },
// };

// const { VantResolver } = require('unplugin-vue-components/resolvers')
// const { ComponentsPlugin } = require('unplugin-vue-components/webpack')

const pxtorem = require('postcss-pxtorem');

module.exports = {

  // configureWebpack: { plugins: [ComponentsPlugin({ resolver: [VantResolver()], }),], },

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('vue')
      .use('postcss-loader')
      .tap(options => ({
        ...options,
        postcssOptions: {
          plugins: [
            pxtorem({
              rootValue: 37.5,
              propList: ['*']
            })
          ],
        },
      }))
      .end();

    // config.module
    //   .rule('css')
    //   .oneOf('normal')
    //   .use('postcss-loader')
    //   .tap(options => ({
    //     ...options,
    //     postcssOptions: {
    //       plugins: [
    //         pxtorem({
    //           rootValue: 16,
    //           propList: ['*']
    //         })
    //       ],
    //     },
    //   }))
    //   .end();
    
  }
};
