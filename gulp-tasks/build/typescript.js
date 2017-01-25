import gulp from 'gulp';
import ts from 'gulp-typescript';
import {files, dirs, filenames} from '../config';

export const typescript = 'build:typescript';
const tsProject = ts.createProject(filenames.tsConfig);

gulp.task(typescript, () => {
    gulp.src(files.ts)
        .pipe(tsProject())
        .pipe(gulp.dest(dirs.dist));
});

