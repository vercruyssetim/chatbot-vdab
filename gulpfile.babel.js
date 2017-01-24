import gulp from 'gulp';
import './gulp-tasks/test/test';
import {dev} from './gulp-tasks/dev/dev';

gulp.task('default', [dev]);