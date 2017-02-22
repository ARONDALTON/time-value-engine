import { Compounding } from "./enums";

export class TimeValueAmortizationSchedule {
    rouding: number;
    compounding: Compounding;
    nominalAnnualRate: number;
    APR: number;
    financeCharge: number;
    amountFinanced: number;
    totalOfPayments: number;
}