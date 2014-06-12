/* global describe, it */

'use strict';

var ngannotate = require('../'),
	fs = require('fs'),
	through = require('through2'),
	browserify = require('browserify');

describe('basic directive', function () {
	it('should be annotated by default', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/basic_expected.js'), 'utf-8');

		browserify({
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

	it('should have annotations removed', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/basic_annotated_expected.js'), 'utf-8');

		browserify({
			entries: require.resolve('./files/basic_annotated.js')
		})
		.transform({ add: false, remove: true }, ngannotate)
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
