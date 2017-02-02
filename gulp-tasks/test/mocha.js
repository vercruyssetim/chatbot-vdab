import gulp from 'gulp';
import mocha from 'gulp-mocha';

export const testunit = 'test:unit';

gulp.task(testunit, () => {
    return gulp.src('src/**/*_test.js', {read: false})
        .pipe(mocha({
            useColors: false
        }))
        .on('error', (err) => {
            console.log(err.toString());
            this.emit('end');
        });
});
