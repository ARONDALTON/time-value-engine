import {
    Compounding,
    ComputeMethod,
    EventType,
    FutureValue,
    ILoanParameters,
    PaymentOnFixedRateLoan,
    TimeValueCashFlowMatrix,
    TimeValueEvent,
    TimeValueResult,
    TV_UNKNOWN,
    YearLength,
} from "../index";

describe("my first test", () => {
    it("should be true", () => {
        expect(true).toBeTruthy();
    });
    it("should be false", () => {
        expect(false).toBeFalsy();
    });
});

// describe("TimeValueCashFlowMatrix tests", () => {

// });

// describe("TimeValueEvent tests", () => {

// });

describe("Setup TValue Problem", () => {
    /*
    Facts   Miller Equipment Co. sells machinery to Wendland on June 11, 2001 for $27,000.
    They allow a trade-in of $4000 on used equipment and take a 9 percent note calling for 28 equal
    monthly payments beginning on August 3, 2001.

    Needed   The monthly payment amount.
    TimeValueEvent
    Settings  This example assumes Normal amortization, 365 day year.
    */

    // Arrange:
    const cfm = new TimeValueCashFlowMatrix();
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
    cfe.eventDate = new Date(2001, 6, 11);
    cfe.eventAmount = 27000;
    cfm.cashFlowEvents.push(cfe);

    // second cash flow line (the $4000 trade in)
    cfe = new TimeValueEvent();
    cfe.eventType = EventType.TVPaymentEvent;
    cfe.eventDate = new Date(2001, 6, 11);
    cfe.eventAmount = 4000;
    cfm.cashFlowEvents.push(cfe);

    // third cash flow line (the payments)
    cfe = new TimeValueEvent();
    cfe.eventType = EventType.TVPaymentEvent;
    cfe.eventDate = new Date(2001, 8, 3);
    cfe.eventAmount = TV_UNKNOWN.AMOUNT;
    cfe.eventNumber = 28;
    cfm.cashFlowEvents.push(cfe);

    // Act
    tvr = cfm.calculate();

    // Assert
    payment = tvr.unknownValue;

    it("should match book amount", () => {
        expect(payment).toEqual(0);
    });
});

describe("should calculate payment on a fixed rate loan", () => {
    it("should equal 699.21", () => {
        const params: ILoanParameters = {
            amount: 100000,
            interest: 0.075,
            term: 360,
        };

        const monthlyPayment = +(PaymentOnFixedRateLoan(params).toFixed(2));
        const tvAnswer = 699.21;
        expect(monthlyPayment).toEqual(tvAnswer);
    });
});

describe("convert annual interest rate to effective interest rate", () => {
    it("test 1", () => {
        const cfm = new TimeValueCashFlowMatrix();
        cfm.nominalAnnualRate = .06;
        cfm.compounding = Compounding.TVMonthlyCompound;
        const ear = cfm.getEffectiveInterestRate();
        const answer = +(ear.toFixed(4));
        expect(answer).toEqual(0.0617);
    });
    it("test 2", () => {
        const cfm = new TimeValueCashFlowMatrix();
        cfm.nominalAnnualRate = .1;
        cfm.compounding = Compounding.TVAnnualCompound;
        const ear = cfm.getEffectiveInterestRate();
        const answer = +(ear.toFixed(4));
        expect(answer).toEqual(0.1000);
    });
    it("test 2", () => {
        const cfm = new TimeValueCashFlowMatrix();
        cfm.nominalAnnualRate = .199;
        cfm.compounding = Compounding.TVDailyCompound;
        const ear = cfm.getEffectiveInterestRate();
        const answer = +(ear.toFixed(4));
        expect(answer).toEqual(0.2201);
    });
});

describe ("future value tests", () => {
    it("should equal 105.00", () => {
        const pv: number = 100;
        const interest: number = .05;
        const n: number = 1;

        const answer = FutureValue(pv, interest, n);
        expect(answer).toBe(105);
    });
});
