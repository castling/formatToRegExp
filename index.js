var parseFormat = require('parseFormat')
var momentExp = require('./momentExp.js')

var toReg = value => Array.isArray(value) ? `{${value.join(',')}}` : value

module.exports = function(format,opts) {
  var param = parseFormat(format)
  return param[0].pre + param.map(d=>{
    var opt = d.option
    var res = ''
    if( opts.values && opts.values[d.name+':'+d.opt] ) {
      res = toReg(opts.values[d.name+':'+d.opt])
    } else if( opts.values && opts.values[d.name] ) {
      res = toReg(opts.values[d.name])
    } else if( opt ) {
      if( d.name === 'time' ) {
        res = momentExp.toUnixExp(opt)
      } else if( opt.indexOf('len')===0 ) {
        res = '?'.repeat(Number(opt.substr(4)))
      } else {
        res = '*'
      }
    } else {
      res = '*'
    }
    return res + d.post
  }).join('')
}
