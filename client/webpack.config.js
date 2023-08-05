const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    // sets grabs from our main js files
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      
    },
    // new "dist" file with our new js file name
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Contact Cards'
      }),
     
      // Injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'text editor',
        short_name: 'editor',
        description: 'add notes and code offline',
        background_color: '#afafaf',
        theme_color: '#225ca3',
        start_url: '/index.html',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          // loads css
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // finds js file and user the babel loader to run ES6
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },  
      ],
    },
  };
};
