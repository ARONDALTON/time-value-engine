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
console.log("iterations: " + answer.numberOfIterations);