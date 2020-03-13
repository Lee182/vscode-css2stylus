const vscode = require('vscode')
const css2stylus = require('css-to-stylus-converter')

const convertors = {
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
		transform({codeContent, config}) {
			return css2stylus(codeContent, config)
		}
	}
}

async function transform({codeContent, convertor, config}) {
	if (!codeContent || !codeContent.length) return resolve(null)
	return convertor.transform({codeContent, config})
}

function transformSelections({editor, key}) {
	let selections = editor.selections
	const vscodeConfig = vscode.workspace.getConfiguration('css2stylus', vscode.window.activeTextEditor.document.uri)
	const convertor = convertors[key]
	const config = convertor.getConfig({vscodeConfig, editor})
	return selections.map((selection) => {
		const codeContent = editor.document.getText(selection)
		return transform({codeContent, convertor, config})
	})
}

function replaceSelections(editor, fragments) {
	editor.edit((builder) => {
		fragments.forEach((fragment, i) => {
			if (!fragment || !fragment.length) return
			builder.replace(editor.selections[i], fragment)
		})
	})
}

const main = (key) => {
	let editor = vscode.window.activeTextEditor
	if (!editor || !convertors[key]) return

	Promise.all(transformSelections({editor, key}))
		.then((fragments) => replaceSelections(editor, fragments))
		.catch((err) => {
			console.error(err)
		})
}

module.exports = main
