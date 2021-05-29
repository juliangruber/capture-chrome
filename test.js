import tap from 'tap'
import screenshot from './index.js'
import http from 'http'
import { promisify } from 'util'

let server
let url

tap.test('setup', async t => {
  server = http.createServer((req, res) => res.end('ohai!'))
  await promisify(server.listen.bind(server))()
  url = `http://localhost:${server.address().port}`
})

tap.test('screenshot', async t => {
  const pic = await screenshot({ url })
  t.ok(pic)
  t.ok(Buffer.isBuffer(pic))
})

tap.test('cleanup', async t => {
  server.close()
})
