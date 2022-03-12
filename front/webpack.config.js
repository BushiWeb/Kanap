const path = require('path');

module.exports = {
    mode: 'production',
    entry : {
        script: './src/js/start/script.js',
        product: './src/js/start/product.js'
    },
    output : {
        filename : '[name].js',
        path : path.resolve(__dirname, 'dist/js')
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader',
                }
            }
        ]
    }
};