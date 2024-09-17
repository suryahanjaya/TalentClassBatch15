import path from 'path';
import fs from 'fs';

// Menggunakan path relatif tanpa __dirname
const nodeModules = {};
fs.readdirSync(path.resolve('./node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const config = {
  name: 'server',
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve('./bin'),
    filename: 'index.js'
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

export default config;
