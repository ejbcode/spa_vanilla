const path = require('path'); //configuracion de node que nos permite acceder haciando estamos dentro de la carpeta
const HtmlWebpackPlugin = require('html-webpack-plugin'); //para trabjar con html
const CopyWebpackPlugin = require('copy-webpack-plugin');
//se creara el modulo donde estara toda la configuracion
module.exports = {
  entry: './src/index.js', //punto de entrada
  output: {
    //salida
    path: path.resolve(__dirname, 'dist'), //hacia donde va el prouecto y crea la carpeta dist
    filename: 'main.js', //el compilado se llamara main.js
  },
  resolve: {
    //extensiones de nuestra app
    extensions: ['.js'], //extenciones que se van a usar
  },
  module: {
    //reglas paa trabajar
    rules: [
      //reglas de babel para compatibilidad de todos los navegadores
      {
        test: /\.js?$/, //
        exclude: /node_modules/, //excuir carpeta
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/styles/styles.css',
        to: '',
      },
    ]),
  ],
};
