// const glob = require('glob-all');
// const path = require('path');
// const PurgecssPlugin = require('purgecss-webpack-plugin');
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const preactCliSvgLoader = require('preact-cli-svg-loader');
const tailwind = require('preact-cli-tailwind');

export default (config, env, helpers) => {
	if (env.isProd) {
		config.devtool = false; // disable sourcemaps
	  }
	preactCliSvgLoader(config, helpers);

	config = tailwind(config, env, helpers);
	return config;
};
