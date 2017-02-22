import { Compounding } from "./enums";

export class TimeValueAmortizationSchedule {
    public rouding: number;
    public compounding: Compounding;
    public nominalAnnualRate: number;
    public APR: number;
    public financeCharge: number;
    public amountFinanced: number;
    public totalOfPayments: number;
}