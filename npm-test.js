// // this file is intended to represent usage of the file after npm-installing... 
var engine = require('time-value-engine');

let cfm = new engine.TimeValueCashFlowMatrix(); 
cfm.nominalAnnualRate = engine.TV_UNKNOWN.RATE;
cfm.compounding = engine.Compounding.TVDailyCompound;

cfm.cashFlowEvents = [
    {
        eventAmount: 10000,
        eventDate: new Date(2016, 0, 1),
        eventNumber: 1,
        eventType: engine.EventType.TVLoanEvent,
    },
    {
        eventAmount: 5050,
        eventDate: new Date(2016, 1, 1),
        eventNumber: 1,
        eventType: engine.EventType.TVPaymentEvent,
    },
    {
        eventAmount: 5050,
        eventDate: new Date(2016, 2, 1),
        eventNumber: 1,
        eventType: engine.EventType.TVPaymentEvent,
    },
];

let answer = cfm.calculate();

console.log("Unknown value: " + answer.unknownValue);
console.log("iterations: " + answer.iterations);

// A multi-line example...
cfm = new engine.TimeValueCashFlowMatrix();
cfm.nominalAnnualRate = engine.TV_UNKNOWN.RATE;
cfm.compounding = engine.Compounding.TVDailyCompound;

cfm.cashFlowEvents = [
    {
        eventAmount: 10500,
        eventDate: new Date(2017, 0, 1),
        eventNumber: 1,
        eventType: engine.EventType.TVLoanEvent,
    },
    {
        eventAmount: 500,
        eventDate: new Date(2017, 1, 1),
        eventNumber: 5,
        eventPeriod: 6,
        eventType: engine.EventType.TVPaymentEvent,
    },
    {
        eventAmount: 9000,
        eventDate: new Date(2017, 6, 1),
        eventNumber: 1,
        eventType: engine.EventType.TVPaymentEvent,
    },
];

answer = cfm.calculate();

console.log("Unknown value: " + answer.unknownValue);
console.log("iterations: " + answer.iterations);
