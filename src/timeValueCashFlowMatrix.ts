import { Compounding, ComputeMethod, TV_UNKNOWN, YearLength } from "./enums";
import { TimeValueEvent } from "./timeValueEvent";
import { TimeValueResult } from "./timeValueResult";

// tslint:no-console

// stores information about a particular problem you are trying to solve
export class TimeValueCashFlowMatrix {
    public label: string;
    public decimalPlaces: number = 2;
    public computeMethod: ComputeMethod;
    public compounding: Compounding;
    // The nominal interest rate (also known as an Annualized Percentage Rate or APR)
    // is the periodic interest rate multiplied by the number of periods per year.
    public nominalAnnualRate: number;
    public yearLength: YearLength = YearLength.Y_365;
    public cashFlowEvents: TimeValueEvent[] = [];

    // derived
    // The effective interest rate is always calculated as if compounded annually. The effective
    // rate is calculated in the following way, where r is the effective rate, i the nominal rate (as a decimal,
    // e.g. 12% = 0.12), and n the number of compounding periods per year (for example, 12 for monthly
    // compounding):
    public effectiveInterestRate: number;
    public periodicInterestRate: number;

    public calculate(): TimeValueResult {
        if (this.nominalAnnualRate === TV_UNKNOWN.RATE) {
            return this.findInterestRate();
        } else {
            return new TimeValueResult();
        }
    }

    private findInterestRate(): TimeValueResult {

        let interestRate: number = 0;
        let minRate = -1000;
        let maxRate = 1000;

        // setup: we have a matrix of events...
        const events = this.cashFlowEvents;
        let interest: number;
        let principle: number;
        let remaining: number;
        const remainder: number = 0.001;
        let delta: number = 1; // needs to be greater than zero
        let lastDate: Date;
        let i: number;
        let numIts: number = 0;

        while (delta > remainder) {

            let counter: number = 0;
            let days: number;
            for (const item of events){

                i = interestRate / 100 / 365; // daily rate

                // for now, assume loan is first item...
                if (counter === 0) {
                    interest = 0; // calculate interest;
                    principle = item.eventAmount;
                    remaining = principle;

                } else {
                    days = (+item.eventDate - +lastDate) / 1000 / 60 / 60 / 24;
                    interest = remaining * i * days;
                    principle = item.eventAmount - interest;
                    remaining = remaining - principle;
                }

                lastDate = item.eventDate;
                counter++;
            }

            delta = Math.abs(remaining);

            if (remaining > remainder) {
                // interest rate is too high
                // we now know a new maxRate
                maxRate = interestRate;
            } else {
                // interst rate is too low
                // we now know a new minRate
                minRate = interestRate;
            }
            interestRate = (maxRate + minRate) / 2;

            numIts++;
        }



        const derp: number = +((i * 365).toFixed(5));

        const tvr = {
            numberOfIterations: numIts,
            roundingAmount: 0,
            roundingDate: new Date(2016, 2, 1),
            unknownValue: derp,
        };

        return tvr;
    }

    // http://simplestudies.com/relationship-between-effective-interest-rate-and-compound-interest.html
    // http://www.calculatorsoup.com/calculators/financial/nominal-interest-rate-calculator.php
    public getEffectiveInterestRate(): number {

        const i = this.nominalAnnualRate;
        const n = this.getCompoudingPeriods();

        const ret = Math.pow(1 + i / n, n) - 1;
        return ret;
    }

    public getCompoudingPeriods(): number {
        if (this.compounding < 100) {
            return this.compounding;
        } else {
            if (this.compounding === Compounding.TVDailyCompound) {
                return this.yearLength;
            } else {
                throw new RangeError("need to figure this out");
            }
        }
    }
}
