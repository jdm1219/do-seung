module.exports = {
    publicPath: "./",
    outputDir: "../server/public",
    devServer: {
        proxy:{
            '/': {
                target: 'http://localhost:3000/',
                changeOrigin: true
            },
            '/chat': {
                target: 'http://localhost:3000/chat',
                changeOrigin: true
            }
        }
    }
}