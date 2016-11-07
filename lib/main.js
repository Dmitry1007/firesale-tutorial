const electron      = require('electron')
const app           = electron.app
const dialog        = electron.dialog
const BrowserWindow = electron.BrowserWindow

var mainWindow = null

app.on('ready', function() {
  console.log('The app is ready')

  mainWindow = new BrowserWindow()

  // __dirname is a globally-available Node variable that references the current directory
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  openFile()

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})

const openFile = function () {
  var files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  });

  if (!files) { return; }

  var file = files[0]

  console.log(file);
};
