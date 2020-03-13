const vscode = require('vscode')
const converters = require('./converters.js')
async function runTransform({codeContent, converter, config}) {
	if (!codeContent || !codeContent.length) return resolve(null)
	return converter.run({codeContent, config})
}

function transformSelections({editor, key}) {
	let selections = editor.selections
	const vscodeConfig = vscode.workspace.getConfiguration('css2stylus', vscode.window.activeTextEditor.document.uri)
	const converter = converters[key]
	const config = converter.getConfig({vscodeConfig, editor})
	return selections.map((selection) => {
		const codeContent = editor.document.getText(selection)
		return runTransform({codeContent, converter, config})
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
	if (!editor || !converters[key]) return

	Promise.all(transformSelections({editor, key}))
		.then((fragments) => replaceSelections(editor, fragments))
		.catch((err) => {
			console.error(err)
		})
}

function activate(context) {
	Object.keys(converters).map((key) => {
		let command = vscode.commands.registerCommand(`extension.${key}`, main.bind(null, key))
		context.subscriptions.push(command)
	})
}
exports.activate = activate

function deactivate() {}
exports.deactivate = deactivate
