var config = {
   entry: './App.jsx',
	
   output: {
      path:__dirname,
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8082,
      historyApiFallback: true
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
        {
            test: /\.less$/,  
            exclude: /node_modules/,
            loader: ['style-loader','css-loader','less-loader']
        },
      ]
   }
}

module.exports = config;