module.exports = function(config) {
  config.set({
    browsers: [
        'PhantomJS'
    ],
    frameworks: [
        'jasmine'
    ],
    files: [
        'tests/**/*.spec.js'
    ],
    plugins: [
        'karma-webpack',
        'karma-jasmine',
        'karma-phantomjs-launcher'
    ],
    preprocessors: {
        'tests/**/*.spec.js': ['webpack'] 
    }
 });
};