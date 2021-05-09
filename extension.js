const vscode = require('vscode')
const converters = require('./converters.js')
const awaity = require('awaity')
async function runTransform ({ codeContent, converter, config }) {
  if (!codeContent || !codeContent.length) return resolve(null)
  return converter.run({ codeContent, config })
}

async function transformSelections ({ editor, converter, selections, config }) {
  const fragments = await Promise.all(
    selections.map((selection) => {
      const codeContent = editor.document.getText(selection)
      return runTransform({ codeContent, converter, config })
    })
  )
  editor.edit((builder) => {
    fragments.forEach((fragment, i) => {
      if (!fragment || !fragment.length) return
      builder.replace(editor.selections[i], fragment)
    })
  })
}

async function transformDocument ({ editor, converter }) {
  const codeContent = await runTransform({ codeContent: editor.document.getText(), converter, config })
  let invalidRange = new vscode.Range(0, 0, editor.document.lineCount /*intentionally missing the '-1' */, 0)
  let fullRange = editor.document.validateRange(invalidRange)
  editor.edit((edit) => edit.replace(fullRange, sText))
}

const main = async (keyConvertor) => {
  let editor = vscode.window.activeTextEditor
  if (!editor || !converters[keyConvertor]) return

  const vscodeConfig = vscode.workspace.getConfiguration('css2stylus', vscode.window.activeTextEditor.document.uri)
  const converter = converters[keyConvertor]
  const config = converter.getConfig({ vscodeConfig, editor })

  try {
    let selections = editor.selections
    const bNoSelections = editor.selections.length === 1 && editor.selections[0].isEmpty
    if (bNoSelections) {
    }
    const fragments = await transformSelections({ editor, converter, selections, config })
    replaceSelections(editor, fragments)
  } catch (err) {
    console.error(err)
  }
}

function activate (context) {
  Object.keys(converters).map((key) => {
    let command = vscode.commands.registerCommand(`extension.${key}`, main.bind(null, key))
    context.subscriptions.push(command)
  })
}
exports.activate = activate

function deactivate () {}
exports.deactivate = deactivate
