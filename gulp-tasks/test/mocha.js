import gulp from 'gulp';
import mocha from 'gulp-mocha';

export const testunit = 'test:unit';

gulp.task(testunit, () => {
    return gulp.src('src/**/*_test.js', {read: false})
        .pipe(mocha({
            useColors: false,
            reporter: 'mocha-jenkins-reporter',
            reporterOptions: {
                junit_report_path: './test-reports/mocha/test-results_mocha.xml'
            }
        }))
        .on('error', (err) => {
            console.log(err.toString());
            this.emit('end');
        });
});
