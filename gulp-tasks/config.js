export const dirs = {
    src: 'src',
    dist: 'dist',
    conf: 'test-config'
};

export const filenames = {
    main: 'application.js',
    gulp: 'gulpfile.babel.js',
};

//noinspection Eslint
export const files = {
    esLint: `${dirs.conf}/.eslintrc`,
    js: `${dirs.src}/**/*.js`,
    karmaConf: `${__dirname}/../${dirs.conf}/karma.conf.js`,
    main: `${dirs.dist}/${filenames.main}`
};

export const filegroups = {
    cleanDist: [`${dirs.dist}/**/*.*`]
};
