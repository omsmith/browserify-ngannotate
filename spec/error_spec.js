/* global describe, it */

'use strict';

var ngannotate = require('../'),
	browserify = require('browserify'),
	expect = require('chai').expect;

describe('errors', function () {
	it('should include filename on first line', function (done) {
		var file = require.resolve('./files/err.js');

		browserify({
			entries: file
		})
		.transform(ngannotate)
		.bundle()
		.on('error', function (err) {
			var firstLine = err.message.split('\n')[0];

			expect(firstLine).to.equal(file);
			done();
		});
	});
});
