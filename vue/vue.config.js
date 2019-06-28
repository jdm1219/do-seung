module.exports = {
    devServer: {
        proxy:{
            '/': {
                target: 'http://ec2-54-180-92-105.ap-northeast-2.compute.amazonaws.com:3000/',
                // target: 'http://localhost:3000/',
                changeOrigin: true
            },
            '/chat': {
                target: 'http://ec2-54-180-92-105.ap-northeast-2.compute.amazonaws.com:3000/chat',
                // target: 'http://localhost:3000/chat',
                changeOrigin: true
            }
        }
    },
    publicPath: "./",
    outputDir: "../server/public"
}