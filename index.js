import fs from 'fs/promises'
import tempDir from 'temp-dir'
import puppeteer from 'puppeteer'
import timers from 'timers/promises'

export default async ({ url, width = 1024, height = 768, wait = 0 }) => {
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
