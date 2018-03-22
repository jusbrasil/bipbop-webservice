module.exports = function karmaRunner(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      './bundle.js',
      './tests/browser.spec.js',
    ],
    exclude: [],
    preprocessors: {
      './tests/**/*.spec.js': ['buble'],
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
