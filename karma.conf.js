module.exports = function(config) {
  config.set({
    browsers: [
        'PhantomJS'
    ],
    frameworks: [
        'jasmine'
    ],
    files: [
        'dist/tests/**/*.spec.js'
    ],
    plugins: [
        'karma-webpack',
        'karma-jasmine',
        'karma-phantomjs-launcher'
    ],
    preprocessors: {
        'dist/tests/**/*.spec.js': ['webpack'] 
    }
 });
};