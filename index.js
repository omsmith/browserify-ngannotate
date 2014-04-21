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
		try {
			var annotateResult = ngAnnotate(data, opts);

			this.push(annotateResult.src);
			cb();
		} catch (err) {
			cb(err);
		}
	}
};
