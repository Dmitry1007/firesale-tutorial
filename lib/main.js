const electron      = require('electron')
const app           = electron.app
const dialog        = electron.dialog
const fs            = require('fs')
const BrowserWindow = electron.BrowserWindow
const Menu          = electron.Menu

var mainWindow = null

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1400, height: 1200})

  mainWindow.webContents.openDevTools()

  var menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // __dirname is a globally-available Node variable that references the current directory
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})

const openFile = function () {
  var files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] }
    ]
  })

  if (!files) { return }

  var file    = files[0]
  var content = fs.readFileSync(file).toString()

  mainWindow.webContents.send('file-opened', file, content)
}

const saveFile = function (content) {
  var fileName = dialog.showSaveDialog(mainWindow, {
    title: 'Save HTML Output',
    defaultPath: app.getPath('documents'),
    filters: [
      { name: 'HTML Files', extensions: ['html']}
    ]
  })

  if(!fileName) { return }

  fs.writeFileSync(fileName, content)
}

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click() { openFile() }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click() { saveFile() }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
    ]
  }
]

if (process.platform == 'darwin') {
  var name = app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit() }
      },
    ]
  })
}

exports.openFile = openFile
exports.saveFile = saveFile
