module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    reporters: ['progress', 'karma-typescript'],
    browsers: ['PhantomJS'],
    // list of files / patterns to load in the browser
    files: [
        { pattern: 'tests/index.spec.ts'},
        { pattern: './index.ts'}
    ],
    preprocessors : {
        '**/*.ts': ['karma-typescript']
    },
    singleRun: true
 });
};