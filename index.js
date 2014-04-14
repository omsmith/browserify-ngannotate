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
		var annotateResult = ngAnnotate(data, {
			add: true
		});
		if (annotateResult.errors) {
			annotateResult.errors.forEach(function (error) {
				this.emit(error);
			});
		}
		this.push(annotateResult.src);

		cb();
	}
};
