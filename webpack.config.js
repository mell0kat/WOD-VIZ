const webpack = require('webpack')
module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: __dirname + "/dist"
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx'],
		modules: ["node_modules"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/, loader: 'awesome-typescript-loader'
			},
			{
				enforce: 'pre',
				test: /\.js$/, loader: 'source-map-loader'
			},
			{ test: /\.json$/, loader: 'json-loader' }
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
}
