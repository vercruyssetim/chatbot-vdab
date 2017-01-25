import gulp from 'gulp';
import runSequence from 'run-sequence';
import {babel} from './babel';
import {typescript} from './typescript';

export const build = 'build';

gulp.task(build, (callback) => {
    runSequence(
        typescript,
        babel,
        callback
    );
});