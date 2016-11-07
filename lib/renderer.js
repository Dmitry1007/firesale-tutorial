const electron = require('electron')
const ipc      = electron.ipcRenderer

ipc.on('file-opened', function (event, file, content) {
  console.log(content)
})
