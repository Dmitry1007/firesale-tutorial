const electron    = require('electron')
const ipc         = electron.ipcRenderer
const $           = require('jquery')
const marked      = require('marked')
const remote      = electron.remote
const mainProcess = remote.require('./main')
const clipboard   = remote.clipboard

const $markdownView   = $('.raw-markdown')
const $htmlView       = $('.rendered-html')
const $openFileButton = $('#open-file')
const $saveFileButton = $('#save-file')
const $copyHtmlButton = $('#copy-html')

ipc.on('file-opened', function (event, file, content) {
  $markdownView.text(content)
  renderMarkdownToHtml(content)
})

function renderMarkdownToHtml(markdown) {
  var html = marked(markdown)
  $htmlView.html(html)
}

$markdownView.on('keyup', function () {
  var content = $(this).val()
  renderMarkdownToHtml(content)
})

$openFileButton.on('click', function () {
  mainProcess.openFile()
})

$copyHtmlButton.on('click', function () {
  var html = $htmlView.html()
  clipboard.writeText(html)
})

$saveFileButton.on('click', function () {
  var html = $htmlView.html()
  mainProcess.saveFile(html)
})
