import * as Index from '../index';

describe('my first test', () => {
    it('should be true', () => {
        expect(true).toBeTruthy();
    });
    it('should be false', () => {
        expect(false).toBeFalsy();
    });
}); 

describe('TimeValueUser tests', () => {

});

describe('TimeValueCashFlowMatrix tests', () => {

});

describe('TimeValueEvent tests', () => {

});

describe('should calculate payment on a fixed rate loan', () => {
    it('should equal time 699.21', () => {
        let params : Index.LoanParameters = {
            amount: 100000,
            interest: 0.075,
            term: 360
        };

        let monthlyPayment = +(Index.PaymentOnFixedRateLoan(params).toFixed(2));
        let tvAnswer = 699.21;
        expect(monthlyPayment).toEqual(tvAnswer);
    })
})
