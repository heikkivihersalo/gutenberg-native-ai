/**
 * Webpack configuration file for Gutenberg AI plugin
 * @author Heikki Vihersalo
 * {@link https://www.kotisivu.dev www.kotisivu.dev}
 */

/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
1.0 Dependencies
2.0 Webpack configurations
--------------------------------------------------------------*/

/*--------------------------------------------------------------
  1.0 Dependencies
--------------------------------------------------------------*/
/**
 * Import path and glob modules
 * @type {import('path')}
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

/**
 * Import the default Webpack configuration from WordPress scripts
 * @type {import('webpack').Configuration}
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * Import custom Webpack packages
 * @type {import('webpack').Configuration}
 */
const CopyPlugin = require('copy-webpack-plugin');

/*--------------------------------------------------------------
  3.0 Webpack configurations
--------------------------------------------------------------*/
module.exports = {
	...defaultConfig,
	entry: {
		'ai/index': [
			path.resolve(__dirname, 'src/features/ai-modal/index.tsx'),
			path.resolve(__dirname, 'src/stores/index.ts'),
		],
		'admin/index': path.resolve(__dirname, 'src/features/admin/index.tsx'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
		alias: {
			'@constants': path.resolve(__dirname, 'src', 'constants'),
			'@features': path.resolve(__dirname, 'src', 'features'),
			'@stores': path.resolve(__dirname, 'src', 'stores'),
			'@hooks': path.resolve(__dirname, 'src', 'hooks'),
		},
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(
						__dirname,
						'src',
						'features',
						'admin',
						'render.php'
					),
					to: path.resolve(__dirname, 'build', 'admin', 'render.php'),
				},
			],
		}),
	],
};
