
import moment = require("moment");

interface ICashFlowItem {
    type: string;
    date: Date;
    amount: number;
    count: number;
    periodicity: number;
}

interface IAmortizationLineItem {
    id: number;
    date: Date;
    payment: number;
    interest: number;
    principal: number;
    balance: number;
}

const myInputs: ICashFlowItem[] = [
    {
        amount: 1000,
        count: 1,
        date: new Date(2016, 1, 1),
        periodicity: 0,
        type : "Loan",
    },
    {
        amount: 87.92,
        count: 12,
        date: new Date(2016, 2, 1),
        periodicity: 1,
        type : "Payment",
    },
];

class Amortization {
    public rate: number;
    public label: string;
    public inputs: ICashFlowItem[] = [];
    public output: IAmortizationLineItem[] = [];
    public periodicRate: number = 0;

    constructor(rate: number, label: string, inputs: ICashFlowItem[]) {
        this.rate = rate;
        this.label = label;
        this.inputs = inputs;
        this.periodicRate = rate / 12 / 100;
    }

    public amortize() {

        let totalCounter = 0;
        let previousBalance = 0;

        this.inputs.forEach((item) => {

            let i = item.count;
            let itemCounter = 0;

            while (i > 0) {

                const ai: IAmortizationLineItem = {
                    balance: 0,
                    date: item.date,
                    id : totalCounter,
                    interest: 0,
                    payment: 0,
                    principal: 0,
                };

                ai.date = (itemCounter === 0) ? item.date
                    : moment(item.date).add(itemCounter, "months").toDate();

                if (item.type === "Loan") {
                    ai.principal = -item.amount;
                    ai.balance = previousBalance + item.amount;
                } else {
                    ai.payment = item.amount;
                    ai.interest = this.periodicRate * previousBalance;
                    ai.principal = item.amount - ai.interest;
                    ai.balance =  previousBalance - ai.principal;
                }

                this.output.push(ai);
                previousBalance = previousBalance - ai.principal;
                i--;
                totalCounter++;
                itemCounter++;
            }
        });
    }
}

function test() {

    const a = new Amortization(10, "I'm a label", myInputs);
    // console.log("Label: " + a.label);
    // console.log("# of cashflow items: " + a.inputs.length);
    a.amortize();

    a.output.forEach((item) => {
        printAi(item);
    });

    // console.log("Done at: " + moment(new Date()).toISOString());

};

function printAi(ai: IAmortizationLineItem) {
    // console.log(`i: ${ai.id}
    //     d: ${moment(ai.date).format("MMM DD YYYY")}
    //     pmt: ${ai.payment.toFixed(2)}
    //     int: ${ai.interest.toFixed(2)}
    //     prin: ${ai.principal.toFixed(2)}
    //     bal: ${ai.balance.toFixed(2)}`);
}

test();
