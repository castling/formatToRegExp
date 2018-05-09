var _ = require('lodash');

var f0to9 = '[0-9]';
var f1to9 = '[1-9]';
var g0to9 = '?([0-9])';
var momentReg = {
	MM: f0to9+f0to9,
	M: f1to9+g0to9,
	DDDD: f0to9+f0to9+f0to9,
	DDD: f1to9+g0to9+g0to9,
	DD: f0to9+f0to9,
	D: f1to9+g0to9,
	d: '[0-6]',
	w: f1to9+g0to9,
	W: f0to9+f0to9,
	YYYY: f0to9+f0to9+f0to9+f0to9,
	YY: f0to9+f0to9,
	gggg: f0to9+f0to9+f0to9+f0to9,
	gg: f0to9+f0to9,
	HH: f0to9+f0to9,
	H: f0to9+g0to9,
	hh: f0to9+f0to9,
	h: f1to9+g0to9,
	mm: f0to9+f0to9,
	m: f1to9+g0to9,
	ss: f0to9+f0to9,
	s: f1to9+g0to9,
	MMMM: '@(January|February|Marth|April|May|Jun|July|August|September|Octorber|November|December)',
	dddd: '@(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)',
	ddd: '@(Sun|Mon|Tue|Wed|Thu|Fri|Sat)',
	dd: '@(Su|Mo|Tu|We|Th|Fr|Sa)',
	A: '@(AM|PM)',
	a: '@(am|pm)',
};
[ 'M', 'D', 'DDD', 'd', 'w', 'W' ].forEach(function(key) {
	momentReg[key+'o'] = momentReg[key] + '@(st|nd|rd|th)';
});

function replaceTimeForm(txt) {
	for( var key in momentReg ) {
		txt = txt.split(key).join(momentReg[key]);
	}
	return txt;
}

module.exports = {
	toUnixExp: function(fname) {
		return _.map(fname.match(/\[[^\]]*\]|[^\[]+/g),function(d) {
			if( d[0]==='[' ) {
				return d.slice(1,-1);
			} else {
				return  replaceTimeForm(d);
			}
		}).join('');
	},
};
