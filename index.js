var ngAnnotate = require('ng-annotate'),
	through = require('through');

module.exports = function () {
	var data = '';

	return through(write, end);

	function write (buf) {
		data += buf;
	}

	function end () {
		var annotateResult = ngAnnotate(data, {
			add: true
		});
		if (annotateResult.errors) {
			annotateResult.errors.forEach(function (error) {
				this.emit(error);
			});
		}
		this.queue(annotateResult.src);
		this.queue(null);
	}
};