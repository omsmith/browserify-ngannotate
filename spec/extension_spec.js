/* global describe, it */

'use strict';

var ngannotate = require('../'),
	fs = require('fs'),
	through = require('through2'),
	browserify = require('browserify');

describe('extention option', function () {
	it('should not annotate unspecified extensions', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/some_wierd_expected.ext'), 'utf-8');

		browserify({
			entries: require.resolve('./files/some_wierd.ext')
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

	it('should annotate extensions set with x', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/some_wierd_annotated_expected.ext'), 'utf-8');

		browserify({
			entries: require.resolve('./files/some_wierd.ext')
		})
		.transform({ x: '.ext' }, ngannotate)
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

	it('should annotate extensions set with ext', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/some_wierd_annotated_expected.ext'), 'utf-8');

		browserify({
			entries: require.resolve('./files/some_wierd.ext')
		})
		.transform({ ext: '.ext' }, ngannotate)
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

	it('should accept arrays', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/some_wierd_annotated_expected.ext'), 'utf-8');

		browserify({
			entries: require.resolve('./files/some_wierd.ext')
		})
		.transform({ ext: ['.ext'], x: ['.foo'] }, ngannotate)
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

	it('should always annotate .js files', function (done) {
		var data = '',
			expected = fs.readFileSync(require.resolve('./files/basic_expected.js'), 'utf-8');

		browserify({
			entries: require.resolve('./files/basic.js')
		})
		.transform({ x: '.foo', ext: '.bar' }, ngannotate)
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
