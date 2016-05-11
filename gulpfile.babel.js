import {exec} from 'child_process'

import gulp from 'gulp'
import gulpif from 'gulp-if'
import source from 'vinyl-source-stream'
import gutil from 'gulp-util'

import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'


const paths = {
	entry: './src/index.js',
	dist: './dist/',
	bundleName: 'react-restricted-character-input'
}

function browserifyCreate() {
	return browserify({
		cache: {},
		packageCache: {},
		entries: paths.entry,
		debug: true,
		plugin: [watchify],
	})
	.transform(babelify, {
		presets: ['es2015', 'react'],
		plugins: ['transform-object-rest-spread']
	})
}

// const Browserify = browserify({
// 	cache: {},
// 	packageCache: {},
// 	entries: paths.entry,
// 	debug: true,
// 	plugin: [watchify],
// })
// .transform(babelify, {
// 	presets: ['es2015', 'react'],
// 	plugins: ['transform-object-rest-spread']
// })

// Browserify.on('update', lib, dist)
// Browserify.on('log', gutil.log)


function dist() {
	let browserifyInstance = browserifyCreate()

	browserifyInstance.on('update', bundle)
	browserifyInstance.on('log', gutil.log)

	function bundle() {
		browserifyInstance.bundle()
			.on('error', function(error){
				gutil.log(error)
				dialog.emit(
					'JS ERROR',
					error.filename,
					dialog.getLineAndColumnString(error),
					error
				)
			})
			.pipe(source(`${paths.bundleName}.js`))
			.pipe(gulp.dest(paths.dist))
	}
}

gulp.task('default', dist)



// gulp.task('lib', function(done) {

//   function bundle(berify, entry) {
//     return berify.bundle()
//       .pipe(source(entry))
//       .pipe(gulp.dest('./'));

//     console.log('processed ' + entry);
//   }

//   glob('./src/learning/media/dev-js/**/*.jsx', function(err, files) {
//     if (err) done(err);

//     var tasks = files.map(function(entry) {
//       const berify = browserify({
//         cache: {},
//         packageCache: {},
//         entries: [entry],
//         debug: true,
//         plugin: [watchify]
//       })
//       .transform(babelify, {presets: ['es2015', 'react']});

//       berify.on('log', gutil.log); // output build logs to terminal
//       berify.on('update', () => bundle(berify, entry));
//       return bundle(berify, entry);
//     });

//     event_stream.merge(tasks).on('end', done);
//   })
// });


