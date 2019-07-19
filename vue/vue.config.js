module.exports = {
    devServer: {
        proxy:{
            '/': {
                target: 'http://ec2-52-79-45-185.ap-northeast-2.compute.amazonaws.com',
                // target: 'http://localhost:3000/',
                changeOrigin: true
            },
            '/chat': {
                target: 'http://ec2-52-79-45-185.ap-northeast-2.compute.amazonaws.com/chat',
                // target: 'http://localhost:3000/chat',
                changeOrigin: true
            }
        }
    },
    publicPath: "./",
    outputDir: "../server/public"
}