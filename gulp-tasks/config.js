export const dirs = {
    src: 'src',
    dist: 'dist',
    conf: 'test-config'
};

export const filenames = {
    serverjs: 'server.js',
    gulp: 'gulpfile.babel.js',
};

//noinspection Eslint
export const files = {
    esLint: `${dirs.conf}/.eslintrc`,
    js: `${dirs.src}/**/*.js`,
    karmaConf: `${__dirname}/../${dirs.conf}/karma.conf.js`,
    server: `${dirs.dist}/${filenames.serverjs}`
};
