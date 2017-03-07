import * as moment from "moment";
import { AmortizationLine } from "./amortizationLine";
import { Compounding, ComputeMethod, UNKNOWN, YearLength } from "./enums";
import { TimeValueEvent } from "./timeValueEvent";
import { TimeValueResult } from "./timeValueResult";

// tslint:disable-next-line:interface-name
// tslint:disable-next-line:class-name
export interface Input {
        yearLength: number;
        compounding: number;
        decimalPlaces: number;
        events: TimeValueEvent[];
}

// stores information about a particular problem you are trying to solve
export class TimeValueCalculator {
    public label: string;
    public decimalPlaces: number = 2;
    public computeMethod: ComputeMethod;
    public compounding: Compounding;
    // The nominal interest rate (also known as an Annualized Percentage Rate or APR)
    // is the periodic interest rate multiplied by the number of periods per year.
    public nominalAnnualRate: number;
    public effectiveAnnualRate: number;
    public yearLength: YearLength = YearLength.Y_365;
    public cashFlowEvents: TimeValueEvent[] = [];

    public effectiveInterestRate: number;
    public periodicInterestRate: number;

    public load(input: Input): void {
        this.yearLength = input.yearLength;
        this.compounding = input.compounding;
        this.decimalPlaces = input.decimalPlaces;
        input.events.forEach((item) => {
            const event: TimeValueEvent = {
                eventAmount: item.eventAmount,
                eventDate: item.eventDate,
                eventNumber: item.eventNumber,
                eventType: item.eventType,
            };
            this.cashFlowEvents.push(event);
        });
    }

    public calculate(): TimeValueResult {
        if (this.nominalAnnualRate === UNKNOWN.RATE) {
            return this.findInterestRate();
        } else {
            return {
                amortizationSchedule: [],
                dailyRate: 0,
                iterations: 0,
                roundingAmount: 0,
                roundingDate: new Date(),
                unknownValue: 0,
            };
        }
    }

    // http://www.calculatorsoup.com/calculators/financial/nominal-interest-rate-calculator.php
    public convertAnnualToEffectiveRate(): number {

        let effectiveRate: number;
        const i = this.nominalAnnualRate;
        if (this.compounding !== Compounding.ContinuousCompound) {
            const n = +this.compounding;
            effectiveRate = Math.pow(1 + i / n, n) - 1;
        } else {
            // i = e^r - 1
            effectiveRate = Math.pow(Math.E, i / 100) - 1;
        }
        return effectiveRate;
    }

    private convertEffectiveToAnnualRate(): number {

        let nominalAnnualRate: number;

        const i = this.effectiveAnnualRate;
        if (this.compounding !== Compounding.ContinuousCompound) {
            const n = +this.compounding;
            // r = m × [ ( 1 + i)1/m - 1 ]
            nominalAnnualRate = n * (Math.pow(1 + i, 1 / n) - 1);
        } else {
            // r = ln(i + 1).
            nominalAnnualRate = Math.log(i + 1);
        }
        return nominalAnnualRate;
    }

    private findInterestRate(): TimeValueResult {

        let interestRate: number = 0;
        let minRate = -1000;
        let maxRate = 1000;

        const events = this.cashFlowEvents;
        let interest: number;
        let principal: number;
        let balance: number;
        const remainder: number = 0.001;
        let delta: number = 1; // needs to be greater than zero
        let lastDate: Date;
        let i: number;
        let iterations: number = 0;
        let solved: boolean = false;
        let amortizationLine;
        let sequence = 0;
        let amortizationSchedule: AmortizationLine[] = [];

        while (!solved) {

            let counter: number = 0;
            let days: number;
            i = interestRate / 365; // daily rate
            amortizationSchedule = [];
            sequence = 0;

            for (const item of events){

                // for now, assume loan is first item...
                if (counter === 0) {
                    balance = item.eventAmount;

                    amortizationLine = {
                        amortizationLineType: item.eventType,
                        balance,
                        date: item.eventDate,
                        days: 0,
                        interest: 0,
                        payment: 0,
                        principal: 0,
                        sequence,
                    };

                    amortizationSchedule.push(amortizationLine);
                    sequence++;
                    lastDate = item.eventDate;
                } else {

                    for (let z = 0; z < item.eventNumber; z++) {
                        const thisDate = moment(item.eventDate).add(z, "months");
                        days = +((+thisDate - +lastDate) / 1000 / 60 / 60 / 24).toFixed(0);
                        interest = +(balance * i * days).toFixed(2);
                        principal = +(item.eventAmount - interest).toFixed(2);
                        balance = +(balance - principal).toFixed(2);
                        lastDate = thisDate.toDate();

                        amortizationLine = {
                            amortizationLineType: item.eventType,
                            balance,
                            date: lastDate,
                            days,
                            interest,
                            payment: item.eventAmount,
                            principal,
                            sequence,
                        };
                        amortizationSchedule.push(amortizationLine);
                        sequence++;
                    }
                }
                counter++;
            }

            delta = Math.abs(balance);

            if (delta >= 0 && delta <= remainder) {

                solved = true;

            } else {
                if (balance > remainder) {
                    // interest rate is too high
                    maxRate = interestRate;
                } else {
                    // interst rate is too low
                    minRate = interestRate;
                }
                interestRate = (maxRate + minRate) / 2;

                iterations++;
            }
        }

        this.effectiveAnnualRate = i * 365;
        this.nominalAnnualRate = this.convertEffectiveToAnnualRate();

        const tvr = {
            amortizationSchedule,
            dailyRate: i,
            iterations,
            roundingAmount: this.nominalAnnualRate, // 0, <<- Hack!!
            roundingDate: new Date(2016, 2, 1),
            unknownValue: this.effectiveAnnualRate,
        };

        return tvr;
    }
}
