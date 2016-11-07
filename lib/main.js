const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

var mainWindow = null

app.on('ready', function() {
  console.log('The app is ready')

  mainWindow = new BrowserWindow()

  // __dirname is a globally-available Node variable that references the current directory
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
