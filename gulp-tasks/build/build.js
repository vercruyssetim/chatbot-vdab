import gulp from 'gulp';
import runSequence from 'run-sequence';
import {babel} from './babel';
import {clean} from './clean';

export const build = 'build';

gulp.task(build, (callback) => {
    runSequence(
        clean,
        babel,
        callback
    );
});