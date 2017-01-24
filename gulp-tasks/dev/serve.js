import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import {files, dirs} from '../config';

export const serve = 'dev:serve';

gulp.task(serve, () => {
    nodemon({
        script: files.server,
        watch: [dirs.dist]
    });
});
