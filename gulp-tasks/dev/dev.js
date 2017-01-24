import gulp from 'gulp';
import runSequence from 'run-sequence';
import {test} from '../test/test';
import {serve} from './serve';
import {watch} from './watch';
import {build} from '../build/build';

export const dev = 'dev';

gulp.task(dev, (callback) => {
    runSequence(
        test,
        build,
        serve,
        watch,
        callback
    );
});
