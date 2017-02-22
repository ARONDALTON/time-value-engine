import { ComputeMethod, Compounding, YearLength } from './enums';
import { TimeValueEvent } from './timeValueEvent';
import { TimeValueResult } from './timeValueResult';

// stores information about a particular problem you are trying to solve
export class TimeValueCashFlowMatrix {
    label: string;
    decimalPlaces: number = 2;
    computeMethod: ComputeMethod;
    compounding: Compounding;
    //The nominal interest rate (also known as an Annualized Percentage Rate or APR) is the periodic interest rate multiplied by the number of periods per year.
    nominalAnnualRate: number;
    yearLength: YearLength = YearLength.Y_365;
    public static decimalPlaces: number = 2;
    cashFlowEvents: TimeValueEvent[] = [];

    // derived
    // The effective interest rate is always calculated as if compounded annually. The effective rate is calculated in the following way, where r is the effective rate, i the nominal rate (as a decimal, e.g. 12% = 0.12), and n the number of compounding periods per year (for example, 12 for monthly // compounding):
    effectiveInterestRate: number;
    periodicInterestRate: number;

    calculate() : TimeValueResult {



        return new TimeValueResult();
    }

    getPeriodicInterestRate(): number {
        switch(this.compounding) {
            case Compounding.TVAnnualCompound:
                return this.nominalAnnualRate / 12;
        }
    }
// http://simplestudies.com/relationship-between-effective-interest-rate-and-compound-interest.html
// http://www.calculatorsoup.com/calculators/financial/nominal-interest-rate-calculator.php 
    getEffectiveInterstRate(): number {
        
        let i = this.nominalAnnualRate;
        let n = this.getCompoudingPeriods();
        
        let ret = Math.pow(1 + i/n, n) - 1;
        return ret;
    }

    getCompoudingPeriods() : number {
        if (this.compounding < 100) {
            return this.compounding;
        }
        else {
            if (this.compounding = Compounding.TVDailyCompound) {
                return this.yearLength;
            }
            else {
                throw new RangeError("need to figure this out");
            }
        }
    }
}

// export function PaymentOnFixedRateLoan(p: LoanParameters): number {
//     let pInt = p.interest / 12;
//     let monthlyPayment = p.amount * ( pInt / (1 - Math.pow(1 + pInt, -(p.term))));
//     return monthlyPayment;
// }