# vscode-css2stylus

> Transform css to stylus inside vscode, save the hassle of external websites.

[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/release/Lee182/vscode-css2stylus.svg?style=flat-square)](https://github.com/Lee182/vscode-css2stylus/releases)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version-short/Lee182.vscode-css2stylus.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=Lee182.vscode-css2stylus)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs/Lee182.vscode-css2stylus.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=Lee182.vscode-css2stylus)

## Features

* Format selection.
* Multiple selections support.
* Keyboard shortcut: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>c</kbd> / <kbd>⌘ Command</kbd> + <kbd>Alt</kbd> + <kbd>c</kbd>

## Installation

Install this extension from the [VSCode
Marketplace](https://marketplace.visualstudio.com/items?itemName=Lee182.vscode-css2stylus)

## Usage

1. Select the css code.
2. Hit <kbd>⌘ Command</kbd> + <kbd>⇧ Shift</kbd> + <kbd>p</kbd> / <kbd>Ctrl</kbd> + <kbd>⇧ Shift</kbd> + <kbd>p</kbd>
3. Run `css2stylus: format selection` or <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>c</kbd> / <kbd>⌘ Command</kbd> + <kbd>Alt</kbd> + <kbd>c</kbd> .

## Keyboard Shortcut

Use the following to embed a shortcut in keybindings.json. Replace with your preferred key bindings.

```js
    {
      "key": "ctrl+alt+c",
      "command": "extension.css2stylus",
    }
```
You can customize your shortcuts too under: File > Preferences > Keyboard Shortcuts. (Code > Preferences > Keyboard Shortcuts on macOS)
Check [key bindings docs](https://code.visualstudio.com/docs/getstarted/keybindings).

## Options

Settings object with defaults.

```json
    {
      "css2stylus": {
        "tabs": false, // !editor.options.insertSpaces
        "indent": 2,
        "unprefix": false,
        "keepColons": false,
        "cssSyntax": false,
        "separateRules": false,
        "removeComments": false,
        "createColorVariables": false
      }
    }
```

## Built With
* [css-to-stylus-converter](https://github.com/KonstantinKai/css-to-stylus-converter#readme) - css to stylus
* [vscode-html2pug](https://github.com/dbalas/vscode-html2pug) - as a good template

## Contributing
Feel free to submit pull request or suggestions [here](https://github.com/Lee182/vscode-css2stylus/issues/new).

## Contributors
* **Jonathan Lee** - *Initial work* - [Lee182](https://github.com/Lee182)
