import gulp from 'gulp';
import runSequence from 'run-sequence';
import {testunit} from './karma';
import {eslint} from './eslint';

export const test = 'test';

gulp.task(test, (callback) => {
    runSequence(
        eslint,
        testunit,
        callback
    );
});
