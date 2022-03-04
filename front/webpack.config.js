const path = require('path');

module.exports = {
    mode: 'production',
    entry : {

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