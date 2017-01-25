export const dirs = {
    src: 'src',
    dist: 'dist',
    conf: 'test-config'
};

export const filenames = {
    gulp: 'gulpfile.babel.js',
    serverjs: 'application.js',
    tsConfig: 'tsconfig.json'
};

//noinspection Eslint
export const files = {
    esLint: `${dirs.conf}/.eslintrc`,
    js: `${dirs.src}/**/*.js`,
    karmaConf: `${__dirname}/../${dirs.conf}/karma.conf.js`,
    server: `${dirs.dist}/${filenames.serverjs}`,
    ts: `${dirs.src}/**/*.ts`,
    tsconfig: `${filenames.tsConfig}`
};
