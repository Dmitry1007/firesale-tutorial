const electron      = require('electron')
const app           = electron.app
const dialog        = electron.dialog
const fs            = require('fs')
const BrowserWindow = electron.BrowserWindow

var mainWindow = null

app.on('ready', function() {
  console.log('The app is ready')

  mainWindow = new BrowserWindow({width: 1400, height: 1200})

  mainWindow.webContents.openDevTools();

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
  });

  if (!files) { return; }

  var file    = files[0]
  var content = fs.readFileSync(file).toString();

  mainWindow.webContents.send('file-opened', file, content)
};

exports.openFile = openFile
