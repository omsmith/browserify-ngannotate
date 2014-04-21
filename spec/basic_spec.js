/* global describe, it */

'use strict';

var ngannotate = require('../'),
	fs = require('fs'),
	through = require('through');

describe('basic directive', function () {
	it('should be annotated by default', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/basic_annotated.js'), 'utf-8');

		fs
			.createReadStream(require.resolve('./files/basic.js'))
			.pipe(ngannotate())
			.pipe(through(function (buf) {
				data += buf;
			}, function () {
				var err;
				if (data !== expected) {
					err = new Error('expected "' + data + '" to be "' + expected + '"');
				}

				done(err);
			}));
	});

	it('should have annotations removed', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/basic.js'), 'utf-8');

		fs
			.createReadStream(require.resolve('./files/basic_annotated.js'))
			.pipe(ngannotate(require.resolve('./files/basic_annotated.js'), {
				add: false,
				remove: true
			}))
			.pipe(through(function (buf) {
				data += buf;
			}, function () {
				var err;
				if (data !== expected) {
					err = new Error('expected "' + data + '" to be "' + expected + '"');
				}

				done(err);
			}));
	});
});
