'use strict';

var ngAnnotate = require('ng-annotate'),
	through = require('through2'),
	defaults = require('defaults'),
	path = require('path');

module.exports = function (file, opts) {
	opts = defaults(opts, {
		add: true,
		x: [],
		ext: []
	});

	opts.x = Array.isArray(opts.x) && opts.x || [opts.x];
	opts.ext = Array.isArray(opts.ext) && opts.ext || [opts.ext];

	var exts = [].concat(opts.x, opts.ext, ['.js']);
	if (exts.indexOf(path.extname(file)) == -1) {
		return through();
	}

	var data = '';

	return through(transform, flush);

	function transform (chunk, enc, cb) {
		data += chunk;
		cb();
	}

	function flush (cb) {
		// jshint validthis: true

		var annotateResult = ngAnnotate(data, opts);

		if (annotateResult.errors) {
			annotateResult.errors.unshift(file);

			cb(new Error(annotateResult.errors.join('\n')));
			return;
		}

		this.push(annotateResult.src);
		cb();
	}
};
