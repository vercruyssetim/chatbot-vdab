import gulp from 'gulp';
import mocha from 'gulp-mocha';

export const testunitDev = 'test:dev:unit';
export const testunitCI = 'test:ci:unit';


gulp.task(testunitDev, () => {
    return gulp.src('src/**/*_test.js', {read: false})
        .pipe(mocha({
            useColors: false,
        }))
        .on('error', (err) => {
            console.log(err.toString());
            this.emit('end');
        });
});

gulp.task(testunitCI, () => {
    return gulp.src('src/**/*_test.js', {read: false})
        .pipe(mocha({
            useColors: false,
            reporter: 'mocha-junit-reporter',
            reporterOptions: {
                mochaFile: './test-reports/mocha/test-results_mocha.xml'
            }
        }))
        .on('error', (err) => {
            console.log(err.toString());
            this.emit('end');
        });
});
