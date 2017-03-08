import {
    Compounding,
    ComputeMethod,
    EventType,
    TimeValueCalculator,
    TimeValueEvent,
    TimeValueResult,
    UNKNOWN,
    YearLength,
} from "../index";

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
    const cfm = new TimeValueCalculator();
    let cfe: TimeValueEvent;
    let tvr: TimeValueResult;
    let payment: number; // <-- What we're trying to find

    cfm.compounding = Compounding.MonthlyCompound;
    cfm.yearLength = YearLength.Y_365;
    cfm.label = "Wendland Equipment";
    cfm.computeMethod = ComputeMethod.NormalAmortization;
    cfm.nominalAnnualRate = 0.09;

    // first cash flow line (the loan)
    cfe = {
        eventAmount: 27000,
        eventDate:  new Date(2001, 6, 11),
        eventNumber: 1,
        eventType: EventType.LoanEvent,
    };

    cfm.cashFlowEvents.push(cfe);

    // second cash flow line (the $4000 trade in)
    cfe = {
        eventAmount: 4000,
        eventDate:  new Date(2001, 6, 11),
        eventNumber: 1,
        eventType: EventType.PaymentEvent,
    };

    cfm.cashFlowEvents.push(cfe);

    // third cash flow line (the payments)
    cfe = {
        eventAmount: UNKNOWN.AMOUNT,
        eventDate:  new Date(2001, 8, 3),
        eventNumber: 28,
        eventType: EventType.PaymentEvent,
    };

    cfm.cashFlowEvents.push(cfe);

    // Act
    tvr = cfm.calculate();

    // Assert
    payment = tvr.unknownValue;

    it("should match book amount", () => {
        expect(payment).toEqual(0);
    });
});

describe("convert annual interest rate to effective interest rate", () => {
    it("test 1", () => {
        const cfm = new TimeValueCalculator();
        cfm.nominalAnnualRate = .06;
        cfm.compounding = Compounding.MonthlyCompound;
        const ear = cfm.convertAnnualToEffectiveRate();
        const answer = +(ear.toFixed(4));
        expect(answer).toEqual(0.0617);
    });
    it("test 2", () => {
        const cfm = new TimeValueCalculator();
        cfm.nominalAnnualRate = .1;
        cfm.compounding = Compounding.AnnualCompound;
        const ear = cfm.convertAnnualToEffectiveRate();
        const answer = +(ear.toFixed(4));
        expect(answer).toEqual(0.1000);
    });
    it("test 2", () => {
        const cfm = new TimeValueCalculator();
        cfm.nominalAnnualRate = .199;
        cfm.compounding = Compounding.DailyCompound;
        const ear = cfm.convertAnnualToEffectiveRate();
        const answer = +(ear.toFixed(4));
        expect(answer).toEqual(0.2201);
    });
    it("test 3", () => {
        const cfm = new TimeValueCalculator();
        cfm.nominalAnnualRate = .15;
        cfm.compounding = Compounding.DailyCompound;
        const ear = cfm.convertAnnualToEffectiveRate();
        const answer = +(ear.toFixed(4));
        expect(answer).toEqual(0.1618);
    });
});

describe("find interst rate", () => {
    it("simplest example", () => {
        const cfm = new TimeValueCalculator();
        cfm.nominalAnnualRate = UNKNOWN.RATE;
        cfm.compounding = Compounding.DailyCompound;

        cfm.cashFlowEvents = [
            {
                eventAmount: 10000,
                eventDate: new Date(2016, 0, 1),
                eventNumber: 1,
                eventType: EventType.LoanEvent,
            },
            {
                eventAmount: 10100,
                eventDate: new Date(2016, 1, 1),
                eventNumber: 1,
                eventType: EventType.PaymentEvent,
            },
        ];

        const result = cfm.calculate();
        const answer = +result.unknownValue.toFixed(5);

        expect(answer).toEqual(.11774);
        console.log("iterations: " + result.iterations);
    });

    it("two payment example", () => {
        const cfm = new TimeValueCalculator();
        cfm.nominalAnnualRate = UNKNOWN.RATE;
        cfm.compounding = Compounding.DailyCompound;

        cfm.cashFlowEvents = [
            {
                eventAmount: 10000,
                eventDate: new Date(2016, 0, 1),
                eventNumber: 1,
                eventType: EventType.LoanEvent,
            },
            {
                eventAmount: 5050,
                eventDate: new Date(2016, 1, 1),
                eventNumber: 1,
                eventType: EventType.PaymentEvent,
            },
            {
                eventAmount: 5050,
                eventDate: new Date(2016, 2, 1),
                eventNumber: 1,
                eventType: EventType.PaymentEvent,
            },
        ];

        const result = cfm.calculate();
        const answer = +result.unknownValue.toFixed(5);

        expect(answer).toEqual(.08013);
        console.log("iterations: " + result.iterations);
        console.log("rate: " + result.unknownValue);
    });

    it("multi line example", () => {
        const cfm = new TimeValueCalculator();
        cfm.nominalAnnualRate = UNKNOWN.RATE;
        cfm.compounding = Compounding.DailyCompound;

        cfm.cashFlowEvents = [
            {
                eventAmount: 10500,
                eventDate: new Date(2017, 0, 1),
                eventNumber: 1,
                eventType: EventType.LoanEvent,
            },
            {
                eventAmount: 500,
                eventDate: new Date(2017, 1, 1),
                eventNumber: 5,
                eventPeriod: 6,
                eventType: EventType.PaymentEvent,
            },
            {
                eventAmount: 9000,
                eventDate: new Date(2017, 6, 1),
                eventNumber: 1,
                eventType: EventType.PaymentEvent,
            },
        ];

        const result = cfm.calculate();
        const answer = +result.unknownValue.toFixed(5);

        expect(answer).toEqual(.20834);
        console.log("iterations: " + result.iterations);
        console.log("nominal annual rate: " + cfm.nominalAnnualRate);
        console.log("effective annual rate: " + cfm.effectiveAnnualRate);
    });

    it("five year simple", () => {
        const cfm = new TimeValueCalculator();
        cfm.nominalAnnualRate = UNKNOWN.RATE;
        cfm.compounding = Compounding.MonthlyCompound;

        cfm.cashFlowEvents = [
            {
                eventAmount: 100000,
                eventDate: new Date(2017, 0, 1),
                eventNumber: 1,
                eventType: EventType.LoanEvent,
            },
            {
                eventAmount: 1819.17,
                eventDate: new Date(2017, 1, 1),
                eventNumber: 60,
                eventPeriod: 6,
                eventType: EventType.PaymentEvent,
            },
        ];

        const result = cfm.calculate();
        const answer = +result.unknownValue.toFixed(5);

        expect(answer).toEqual(.03502);
        console.log("iterations: " + result.iterations);
        console.log("effective rate: " + cfm.effectiveAnnualRate);
        console.log("nominal rate: " + cfm.nominalAnnualRate);
    });
});
