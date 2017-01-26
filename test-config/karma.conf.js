//noinspection Eslint
module.exports = function (config) {
    //noinspection Eslint
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine', 'karma-typescript'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/**/*.js',
            'src/**/*.ts'
        ],

        // list of files / patterns to exclude
        exclude: [],

        browserNoActivityTimeout: 600000,

        // Which plugins to enable
        plugins: [
            'karma-chrome-launcher',
            // 'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-typescript',
            'karma-typescript-preprocessor',
            'karma-coverage',
            'karma-junit-reporter'
        ],

        preprocessors: {
            'src/**/*.ts': ['karma-typescript']
        },

        typescriptPreprocessor: {
            options: {
                allowJs: true,
                sourceMap: true, // (optional) Generates corresponding .map file.
                target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
                noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: false, // (optional) Skip resolution and preprocessing.
                removeComments: true, // (optional) Do not emit comments to output.
                concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
            },
            // extra typing definitions to pass to the compiler (globs allowed)
            // transforming the filenames
            transformPath: function (path) {
                return path.replace(/\.ts$/, '.js');
            }
        },

        reporters: ['dots', 'junit', 'karma-typescript'],
        junitReporter: {
            outputFile: '../test-reports/karma/test-results_karma.xml'
        },
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'Chrome'
        ]
    });
};
