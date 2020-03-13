const css2stylus = require('css-to-stylus-converter')
const stylus = require('stylus')

const converters = {
	stylus2css: {
		getConfig() {
			return {}
		},
		run({codeContent, config}) {
			return new Promise((resolve, reject) => {
				stylus.render(codeContent, {}, function(err, css) {
					if (err) {
						reject(err)
						return
					}
					resolve(css)
				})
			})
		}
	},
	css2stylus: {
		getConfig({vscodeConfig, editor}) {
			return {
				tabs: vscodeConfig.get('tabs', !editor.options.insertSpaces),
				indent: vscodeConfig.get('indent'),
				keepColons: vscodeConfig.get('keepColons'),
				cssSyntax: vscodeConfig.get('cssSyntax'),
				separateRules: vscodeConfig.get('separateRules'),
				removeComments: vscodeConfig.get('removeComments'),
				colorVariables: vscodeConfig.get('colorVariables'),
				colorPrefix: vscodeConfig.get('colorPrefix')
			}
		},
		run({codeContent, config}) {
			return css2stylus(codeContent, config)
		}
	}
}

module.exports = converters
