import gulp from 'gulp';
import runSequence from 'run-sequence';
import {babel} from './babel';

export const build = 'build';

gulp.task(build, (callback) => {
    runSequence(
        babel,
        callback
    );
});