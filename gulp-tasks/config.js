export const dirs = {
    src: 'src',
    conf: 'test-config'
};

export const filenames = {
    serverjs: 'server.js',
    gulp: 'gulpfile.babel.js',
};

export const files = {
    esLint: `${dirs.conf}/.eslintrc`,
    js: `${dirs.src}/app/**/*.js`,
    karmaConf: `${__dirname}/../${dirs.conf}/karma.conf.js`,
    server: `${dirs.src}/${filenames.serverjs}`
};
