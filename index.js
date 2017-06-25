#! /usr/bin/env electro

var render = require('./render')
require('ssb-client')(function (err, sbot) {
  ;(function next () {
    sbot.status(function (err, data) {
      document.body.innerHTML = ''
      document.body.appendChild(render(data))
      setTimeout(next, 1000)
    })
  })()
})


