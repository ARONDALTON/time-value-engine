

import * as Index from '../index';

describe('my first test', () => {
    it('should be true', () => {
        expect(true).toBeTruthy('What? Why was true not truthy?');
    });
    it('should be false', () => {
        expect(false).toBeFalsy();
    });
}); 

describe('greeter test', () => {
    let greeter = new Index.Greeter('Test Message');
    var message = greeter.speak();

    it('should be "Test Message"', () => {
        expect(message).toEqual('Test Message');
    });
});

describe('greeter test2', () => {
    let greeter = new Index.Greeter('Test Message2');
    var message = greeter.speak();

    it('should be "Test Message2"', () => {
        expect(message).toEqual('Test Message2');
    });
});
