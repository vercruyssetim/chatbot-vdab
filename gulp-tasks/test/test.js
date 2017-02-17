import gulp from 'gulp';
import runSequence from 'run-sequence';
import {testunitDev, testunitCI} from './mocha';
import {eslint} from './eslint';

export const test = 'test';
export const testDev = 'test:dev';
export const testCI = 'test:ci';

gulp.task(testDev, (callback) => {
    runSequence(
        eslint,
        testunitDev,
        callback
    );
});

gulp.task(testCI, (callback) => {
    runSequence(
        eslint,
        testunitCI,
        callback
    );
});

gulp.task(test, (callback) => {
    runSequence(
        testunitDev,
        callback
    );
});