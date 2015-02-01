/* global describe, it */

'use strict';

var ngannotate = require('../'),
	fs = require('fs'),
	through = require('through2'),
	convertSourceMap = require('convert-source-map'),
	expect = require('chai').expect;

describe('debug enabled', function () {
	it('should output sourcemap', function (done) {
		var data = '',
			file = require.resolve('./files/basic.js');

		fs
			.createReadStream(file)
			.pipe(ngannotate(file, { _flags: { debug: true } }))
			.pipe(through(function (buf, enc, cb) {
				data += buf;
				cb();
			}, function (cb) {
				cb();

				var map = convertSourceMap.fromSource(data).toObject();

				expect(map).to.deep.equal({
					version: 3,
					sources: [file],
					names: [],
					mappings: 'AAAA,QAAQ,OAAO,SAAS,IAAI,UAAU,sBAAS,UAAU,UAAU,KAAI',
					sourcesContent: [fs.readFileSync(file, 'utf8')]
				});

				done();
			}));
	});
});
