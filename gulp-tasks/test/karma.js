import gulp from 'gulp';
import karma from 'karma';
import {files} from '../config';

export const testunit = 'test:unit';

gulp.task(testunit, (callback) => {
    const server = new karma.Server({
        configFile: files.karmaConf,
        singleRun: true
    }, function () {
        callback();
    });
    server.start();
});
