const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const readFile = promisify(require('fs').readFile)
const mkdir = promisify(require('fs').mkdir)
const tempDir = require('temp-dir')
const chrome = require('chromium-prebuilt')

module.exports = async ({ url, width: width = 1024, height: height = 768 }) => {
  const cwd = `${tempDir}/${Date.now()}${Math.random().toString(16).slice(2)}`
  await mkdir(cwd)
  await exec(
    `${chrome} ${[
      '--headless',
      '--disable-gpu',
      '--screenshot',
      `--window-size=${width}x${height}`,
      '--hide-scrollbars',
      url
    ].join(' ')}`,
    { cwd }
  )
  return readFile(`${cwd}/screenshot.png`)
}
