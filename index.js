const { promisify } = require('util')
const readFile = promisify(require('fs').readFile)
const mkdir = promisify(require('fs').mkdir)
const tempDir = require('temp-dir')
const puppeteer = require('puppeteer')
const sleep = require('yoctodelay')

module.exports = async ({
  url,
  width: width = 1024,
  height: height = 768,
  wait: wait = 0
}) => {
  const cwd = `${tempDir}/${Date.now()}${Math.random()
    .toString(16)
    .slice(2)}`
  await mkdir(cwd)
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.goto(url, { waitUntil: 'networkidle2' })
  await sleep(wait)
  await page.screenshot({ path: `${cwd}/screenshot.png` })
  browser.close()
  return readFile(`${cwd}/screenshot.png`)
}
