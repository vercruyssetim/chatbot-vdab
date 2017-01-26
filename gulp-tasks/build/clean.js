import gulp from 'gulp';
import del from 'del';
import {filegroups} from '../config';

export const clean = 'build:clean';

gulp.task(clean, (callback) => del(filegroups.cleanDist, callback));
