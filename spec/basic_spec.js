/* global describe, it */

'use strict';

var ngannotate = require('../'),
	fs = require('fs'),
	through = require('through');

describe('basic directive', function () {
	it('should be annotated', function (done) {
		var data = '',
			expected = 'angular.module(\'basic\', []).directive(\'basic\', ["someCtrl", function (someCtrl) {}]);';

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
});
