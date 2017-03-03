// this file is intended to represent usage of the file after npm-installing... 

var i = require('./dist/index');
var p = {
    amount: 100000,
    interest: 0.075,
    term: 360,
};

const monthlyPayment = +(i.PaymentOnFixedRateLoan(p).toFixed(2));
console.log("monthly Payment: " + monthlyPayment);
const tvAnswer = 699.21;
const finalAnswer = tvAnswer - monthlyPayment;
console.log("Final Answer: " + finalAnswer);
