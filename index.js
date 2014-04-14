var ngAnnotate = require('ng-annotate'),
	through = require('through2');

module.exports = function () {
	var data = '';

	return through(transform, flush);

	function transform (chunk, enc, cb) {
		data += chunk;
		cb();
	}

	function flush (cb) {
		try {
			var annotateResult = ngAnnotate(data, {
				add: true
			});

			this.push(annotateResult.src);
			cb();
		} catch (err) {
			cb(err);
		}
	}
};
