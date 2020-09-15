var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/*.html']
};

const copyHtml = () => {
	return gulp.src(paths.pages)
	.pipe(gulp.dest("dist"));
}

let isWath = false;

if (isWath) {
	// ------- WATCHIFY
	var watchify = require("watchify");
	var gutil = require("gulp-util");

	var watchedBrowserify = watchify(browserify({
		basedir: '.',
		debug: true,
		entries: ['src/main.ts'],
		cache: {},
		packageCache: {}
	}).plugin(tsify));


	function bundle() {
		return watchedBrowserify
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest("dist"));
	}

	exports.default = gulp.series(copyHtml, bundle);
	watchedBrowserify.on("update", bundle);
	watchedBrowserify.on("log", gutil.log);
} else {
	// ------- Browserify
	const build = () => {
		return browserify({
			basedir: '.',
			debug: true,
			entries: ['src/main.ts'],
			cache: {},
			packageCache: {}
		})
		.plugin(tsify)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest("dist"));
	}
	exports.default = gulp.series(copyHtml, build);
}
