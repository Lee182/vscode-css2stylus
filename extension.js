const vscode = require('vscode')
const main = require('./commands/main.js')

function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.css2stylus', main.bind(null, 'css2stylus'))
	context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {}
exports.deactivate = deactivate
