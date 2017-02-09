var 
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	eslint = require('gulp-eslint');

var 
	source = 'source/',
	dest = 'build';

var
	css = {
		in: source + 'scss/main.scss',
		watch:[ source + 'scss/**/*' ],
		out: dest + 'css/',
		sassOpts: {
			outputStyle: 'nested',
			precision: 3,
			errLogToConsole: true
		}
	}
gulp.task('sass', function(){
	return gulp.src(css.in)
		.pipe(sass(css.sassOpts))
		.pipe(gulp.dest(css.out))
})

 
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['source/**/*','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});
 


gulp.task('default', function(){
	gulp.watch(css.watch, ['sass'], ['lint']);
})