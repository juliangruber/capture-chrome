# capture-chrome

Capture screenshots using Chrome's new headless mode. This means it does _not_
require a graphical environment / X server to run!

Also you don't even need to have Chromium or Chrome installed, this will fetch an up
to date binary for you.

[![build status](https://secure.travis-ci.org/juliangruber/capture-chrome.png)](http://travis-ci.org/juliangruber/capture-chrome) [![Greenkeeper badge](https://badges.greenkeeper.io/juliangruber/capture-chrome.svg)](https://greenkeeper.io/)

## Example

Capture a `1024x768` screenshot of [github.com](http://github.com):

```js
const capture = require('capture-chrome')
const fs = require('fs')

capture({
  url: 'https://github.com/'
}).then(screenshot => {
  fs.writeFileSync(`${__dirname}/example.png`, screenshot)
  console.log('open example.png')
})
```

![github.com](https://raw.github.com/juliangruber/capture-chrome/master/example.png)

## API

### screenshot({ url, width = 1024, height = 768, wait = 0 })

Capture a screenshot of `url`, returns a `Promise` which resolves with a buffer.

Options:

- `url` Page url
- `width` Viewport width
- `height` Viewport height
- `wait` Time in `ms` to wait after the page finished loading all resources

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install capture-chrome
```

## CI

This project will work in CI environments like Travis and AppVeyor without any additional configuration. It fetches Chromium itself and doesn't need a X server to run.

## Related projects

- __[capture-screenshot](https://github.com/juliangruber/capture-screenshot)__ &mdash; Capture screenshots in multiple browsers
- __[capture-electron](https://github.com/juliangruber/capture-electron)__ &mdash; Capture screenshots using Electron
- __[capture-phantomjs](https://github.com/juliangruber/capture-phantomjs)__ &mdash; Capture screenshots using PhantomJS

## License

(MIT)

Copyright (c) 2017 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
