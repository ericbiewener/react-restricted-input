import {exec} from 'child_process'
import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'


const paths = {
	entry: './src/index.js',
	entryGlob: './src/**/*.js',
	dist: './dist/',
	lib: './lib/',
	bundleName: 'react-restricted-input',
	browserifyImportRoot: './'
}

const dialog = {
  emit: (...args) => {
  	exec(`osascript -e "display dialog \\"${args.join('\n\n')}\\""`)
  },
  getLineAndColumnString: error => (
  	error.loc && `Line: ${error.loc.line}    Column: ${error.loc.column}`
  )
}

function emitJsError(error) {
	console.log(error)
	dialog.emit(
		'JS ERROR',
		error.filename,
		dialog.getLineAndColumnString(error),
		error
	)
}

function lib() {
	gulp.src(paths.entryGlob)
		.pipe(babel({
			presets: ['es2015', 'react'],
			plugins: ['transform-object-rest-spread']
		}))
		.pipe(gulp.dest(paths.lib))
}

function libWatch() {
	gulp.watch(paths.entryGlob, lib)
	lib()
}
 
function dist() {
	function bundle() {
		Browserify.bundle()
			.on('error', emitJsError)
			.pipe(source(`${paths.bundleName}.js`))
			.pipe(buffer())
			.pipe(gulp.dest(paths.dist))
			.pipe(rename(`${paths.bundleName}.min.js`))
			.pipe(uglify({mangle: true}))
			.pipe(gulp.dest(paths.dist))
	}

	const Browserify = browserify({
		cache: {},
		packageCache: {},
		entries: paths.entry,
		plugin: [watchify],
		paths: ['./node_modules', paths.browserifyImportRoot]
	})
	.ignore('react')
	.transform(babelify, {
		presets: ['es2015', 'react'],
		plugins: ['transform-object-rest-spread']
	})

	Browserify.on('update', bundle)
	Browserify.on('log', console.log)

	bundle()
}


gulp.task('lib', lib)
gulp.task('libWatch', libWatch)
gulp.task('dist', dist)
gulp.task('default', ['libWatch', 'dist'])