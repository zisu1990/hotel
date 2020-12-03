module.exports = {
    outputDir: 'dist',
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        open: true,
        port: 8000,
        proxy: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BASE_API
    },

}