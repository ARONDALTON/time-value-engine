import {
    Compounding, 
    ComputeMethod, 
    EventType, 
    LoanParameters,
    PaymentOnFixedRateLoan,
    TimeValueCashFlowMatrix, 
    TimeValueEvent, 
    TimeValueResult, 
    TV_UNKNOWN, 
    YearLength
} from '../index';

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

describe('Setup TValue Problem', () => {
    /*
    Facts   Miller Equipment Co. sells machinery to Wendland on June 11, 2001 for $27,000.  They allow a trade-in of $4000 on used equipment and take a 9 percent note calling for 28 equal monthly payments beginning on August 3, 2001. 
    
    Needed   The monthly payment amount. 
    TimeValueEvent
    Settings  This example assumes Normal amortization, 365 day year. 
    */

    // Arrange:
    let cfm = new TimeValueCashFlowMatrix(); //user.TimeValueCashFlowMatrix;
    let cfe: TimeValueEvent;
    let tvr: TimeValueResult;
    let payment: number; // <-- What we're trying to find

    cfm.compounding = Compounding.TVMonthlyCompound;
    cfm.yearLength = YearLength.Y_365;
    cfm.label = "Wendland Equipment";
    cfm.computeMethod = ComputeMethod.TVNormalAmortization;
    cfm.nominalAnnualRate = 0.09;

    // first cash flow line (the loan)
    cfe = new TimeValueEvent();
    cfe.eventType = EventType.TVLoanEvent;
    cfe.eventDate = new Date(2001,6,11);
    cfe.eventAmount = 27000;
    cfm.cashFlowEvents.push(cfe);

    // second cash flow line (the $4000 trade in)
    cfe = new TimeValueEvent();
    cfe.eventType = EventType.TVPaymentEvent;
    cfe.eventDate = new Date(2001,6,11);
    cfe.eventAmount = 4000;
    cfm.cashFlowEvents.push(cfe);

    // third cash flow line (the payments)
    cfe = new TimeValueEvent();
    cfe.eventType = EventType.TVPaymentEvent;
    cfe.eventDate = new Date(2001,8,3);
    cfe.eventAmount = TV_UNKNOWN.AMOUNT;
    cfe.eventNumber = 28;
    cfm.cashFlowEvents.push(cfe);

    // Act
    tvr = cfm.calculate();

    // Assert
    payment = tvr.unknownValue;

    it('should match book amount', () => {
        expect(payment).toEqual(0);
    });
});

describe('should calculate payment on a fixed rate loan', () => {
    it('should equal 699.21', () => {
        let params: LoanParameters = {
            amount: 100000,
            interest: 0.075,
            term: 360
        };

        let monthlyPayment = +(PaymentOnFixedRateLoan(params).toFixed(2));
        let tvAnswer = 699.21;
        expect(monthlyPayment).toEqual(tvAnswer);
    })
})
