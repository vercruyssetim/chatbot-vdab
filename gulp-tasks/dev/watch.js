import gulp from 'gulp';
import {files} from '../config';
import {build} from '../build/build';

export const watch = 'dev:watch';

gulp.task(watch, () => {
    return gulp.watch(files.js, [build]);
});
