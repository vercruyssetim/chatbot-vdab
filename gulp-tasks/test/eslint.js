import gulp from 'gulp';
import fs from 'fs';
import gulpEslint from 'gulp-eslint';
import {files, filenames} from '../config';

export const eslint = 'test:eslint';

gulp.task(eslint, () => {
    return gulp.src([filenames.gulp, files.js])
        .pipe(gulpEslint({
            configFile: files.esLint
        }))
        .pipe(gulpEslint.format())
        .pipe(gulpEslint.format('checkstyle', fs.createWriteStream('test-reports/eslint/checkstyle-result.xml')))
        .pipe(gulpEslint.failAfterError());
});
