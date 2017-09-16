const { test } = require('tap')
const screenshot = require('.')
const http = require('http')

let server, url

test('setup', t => {
  server = http.createServer((req, res) => res.end('ohai!'))
  server.listen(() => {
    url = `http://localhost:${server.address().port}`
    t.end()
  })
})

test('screenshot', async t => {
  const pic = await screenshot({ url })
  t.ok(pic)
  t.ok(Buffer.isBuffer(pic))
})

test('cleanup', t => {
  server.close()
  t.end()
})
