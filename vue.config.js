module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Game-Keeper Ticket 2 phone';
        return args;
      });
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/main.scss";
        `
      }
    }
  }
};
