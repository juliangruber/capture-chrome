'use strict'

const { test } = require('tap')
const screenshot = require('.')
const http = require('http')
const { promisify } = require('util')

let server, url

test('setup', async t => {
  server = http.createServer((req, res) => res.end('ohai!'))
  await promisify(server.listen.bind(server))()
  url = `http://localhost:${server.address().port}`
})

test('screenshot', async t => {
  const pic = await screenshot({ url })
  t.ok(pic)
  t.ok(Buffer.isBuffer(pic))
})

test('cleanup', async t => {
  server.close()
})
