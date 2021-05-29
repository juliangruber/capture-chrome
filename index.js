'use strict'

const fs = require('fs/promises')
const tempDir = require('temp-dir')
const puppeteer = require('puppeteer')
const timers = require('timers/promises')

module.exports = async ({ url, width = 1024, height = 768, wait = 0 }) => {
  const cwd = `${tempDir}/${Date.now()}${Math.random()}`
  await fs.mkdir(cwd)
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.goto(url, { waitUntil: 'networkidle2' })
  await timers.setTimeout(wait)
  await page.screenshot({ path: `${cwd}/screenshot.png` })
  browser.close()
  return fs.readFile(`${cwd}/screenshot.png`)
}
