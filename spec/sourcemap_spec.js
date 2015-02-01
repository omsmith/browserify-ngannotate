/* global describe, it */

'use strict';

var ngannotate = require('../'),
	fs = require('fs'),
	through = require('through2'),
	browserify = require('browserify');

describe('debug enabled', function () {
	it('should output sourcemap', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/basic_sourcemap_expected.js'), 'utf-8');

		browserify({
			debug: true,
			entries: require.resolve('./files/basic.js')
		})
		.transform(ngannotate)
		.bundle()
		.pipe(through(function (buf, enc, cb) {
			data += buf;
			cb();
		}, function (cb) {
			var err;
			if (data !== expected) {
				err = new Error('expected "' + data + '" to be "' + expected + '"');
			}

			cb();
			done(err);
		}));
	});
});
