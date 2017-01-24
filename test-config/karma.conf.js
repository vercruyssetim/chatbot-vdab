module.exports = function (config) {
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
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/**/*_test.js'
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
            'karma-babel-preprocessor',
            //'karma-coverage',
            'karma-junit-reporter'
        ],

        proxies: {
            '/src/': '/base/src/',
            '/jspm_packages/': '/src/jspm_packages/'
        },

        preprocessors: {
            'src/**/*.js': ['babel']
        },

        babelPreprocessor: {
            options: {
                sourceMap: 'inline',
                retainLines: true
            }
        },

        reporters: ['dots', 'junit'],
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
            'PhantomJS'
        ]
    });
};
