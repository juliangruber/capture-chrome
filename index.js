const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const readFile = promisify(require('fs').readFile)
const mkdir = promisify(require('fs').mkdir)
const tempDir = require('temp-dir')
const chrome = require('chromium-prebuilt')
const escape = require('shell-escape')

module.exports = async ({ url, width: width = 1024, height: height = 768 }) => {
  const cwd = `${tempDir}/${Date.now()}${Math.random().toString(16).slice(2)}`
  await mkdir(cwd)
  await exec(
    escape([
      chrome,
      '--headless',
      '--disable-gpu',
      '--screenshot',
      `--window-size=${width}x${height}`,
      '--hide-scrollbars',
      url
    ]),
    { cwd }
  )
  return readFile(`${cwd}/screenshot.png`)
}
