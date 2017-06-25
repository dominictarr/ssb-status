var h = require('hyperscript')
var hj = require('hyperobj')

function round (n, places) {
  var d = Math.pow(10, places)
  return Math.round(n*d)/d
}

function shortId (id) {
  if(/^@/.test(id)) return id.substring(0, 8)
}

function isNumber(n) {
  return 'number' === typeof n
}

function shorten (str) {
  if('string' == typeof str) {
    if(str.length <= 20) return str
      return h('div', {title: str, style: {overflow: 'hidden', width: '10em'}},
      str
    ) //.substring(0, 17)+'...')
    }
}

function inline (obj) {
  if(obj && 'object' == typeof obj) return h('pre', JSON.stringify(obj))
}

function mean (obj) {
  if('object' == typeof obj && isNumber(obj.mean) && isNumber(obj.stdev))
    return h('span.average', round(obj.mean, 2), '+-', round(obj.stdev, 2))
}

var defaults = hj(
  shortId, shorten, mean, hj.basic(), hj.sections()
)

var render = hj(
  hj.rule(/^ebt|gossip/,
    hj(hj.table(null, defaults), defaults)
  ),
  mean,
  hj.sections(),
  hj.basic(),
  inline
)

module.exports = render




