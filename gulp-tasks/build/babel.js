import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import {files, dirs} from '../config';

export const babel = 'build:babel';

gulp.task(babel, () => {
    return gulp.src(files.js)
        .pipe(gulpBabel())
        .pipe(gulp.dest(dirs.dist));
});
