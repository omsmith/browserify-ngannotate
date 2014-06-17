'use strict';

var ngAnnotate = require('ng-annotate'),
	through = require('through2'),
	defaults = require('defaults');

module.exports = function (file, opts) {
	opts = defaults(opts, {
		add: true
	});

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
