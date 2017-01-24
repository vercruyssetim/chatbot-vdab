import gulp from 'gulp';
import runSequence from 'run-sequence';
import {test} from '../test/test';
import {serve} from './serve';

export const dev = 'dev';

gulp.task(dev, (callback) => {
    runSequence(
        test,
        serve,
        callback
    )
});
