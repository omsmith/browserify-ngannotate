/* global describe, it */

'use strict';

var ngannotate = require('../'),
	fs = require('fs'),
	through = require('through2'),
	convertSourceMap = require('convert-source-map'),
	expect = require('chai').expect,
	browserify = require('browserify');

describe('debug enabled', function () {
	it('should output sourcemap', function (done) {
		var data = '',
			file = require.resolve('./files/basic.js');

		browserify({
			entries: file,
			debug: true
		})
		.transform(ngannotate)
		.bundle()
		.pipe(through(function (buf, enc, cb) {
			data += buf;
			cb();
		}, function (cb) {
			cb();

			var map = convertSourceMap.fromSource(data).toObject();

			expect(map).to.deep.equal({
				version: 3,
				sources: [
					'node_modules/browser-pack/_prelude.js',
					file
				],
				names: [],
				mappings: 'AAAA;ACAA,QAAQ,OAAO,SAAS,IAAI,UAAU,sBAAS,UAAU,UAAU,KAAI',
				file: 'generated.js',
				sourceRoot: '',
				sourcesContent: [
					fs.readFileSync(require.resolve('browser-pack/_prelude'), 'utf8'),
					fs.readFileSync(file, 'utf8')
				]
			});

			done();
		}));
	});
	
	it('should output sourcemap for multiple modules', function (done) {
		var data = '',
			first = require.resolve('./files/multi/first.js'),
			second = require.resolve('./files/multi/second.js'),
			third = require.resolve('./files/multi/third.js');

		browserify({
			entries: first,
			debug: true
		})
		.transform(ngannotate)
		.bundle()
		.pipe(through(function (buf, enc, cb) {
			data += buf;
			cb();
		}, function (cb) {
			var map = convertSourceMap.fromSource(data).toObject();
			
			expect(map).to.deep.equal({
				version: 3,
				sources: [
					'node_modules/browser-pack/_prelude.js',
					first,
					second,
					third
				],
				names: [],
				mappings: 'AAAA;ACAA,QAAQ;AACR,QAAQ,WAAW;;;ACDnB,SAAS,SAAS,EAAE;;;ACApB,SAAS,QAAQ,EAAE',
  				file: 'generated.js',
  				sourceRoot: '',
				sourcesContent: [
					fs.readFileSync(require.resolve('browser-pack/_prelude'), 'utf8'),
					fs.readFileSync(first, 'utf8'),
					fs.readFileSync(second, 'utf8'),
					fs.readFileSync(third, 'utf8'),
				]
			});

			cb();
			done();
		}));
	});
});
