const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const readFile = promisify(require('fs').readFile)
const mkdir = promisify(require('fs').mkdir)
const tempDir = require('temp-dir')
const escape = require('shell-escape')
const puppeteer = require('puppeteer')

module.exports = async ({ 
  url, 
  width: width = 1024, 
  height: height = 768 , 
  timeout:timeout = 3000
}) => {
  const cwd = `${tempDir}/${Date.now()}${Math.random().toString(16).slice(2)}`

  function timeoutHandler(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  await mkdir(cwd)
  await (async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: width, height: height})
    await page.goto(url, {waitUntil: 'networkidle2'});
    await timeoutHandler(timeout)
    await page.screenshot({path: `${cwd}/screenshot.png`});
    browser.close();
    const file = await readFile(`${cwd}/screenshot.png`)
  })();

  return readFile(`${cwd}/screenshot.png`)

}
