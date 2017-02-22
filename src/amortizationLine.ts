import { AmortizationLineType } from "./enums";

export class AmortizationLine {
    public amortizationLineType: AmortizationLineType;
    public date: Date;
    public sequenceNumber: number;
    public loan1Amount: number;
    public loan2Amount: number;
    public loan3Amount: number;
    public payment1Amount: number;
    public payment2Amount: number;
    public payment3Amount: number;
    public interestAccrued: number;
    public interestPaid: number;
    public principalPaid: number;
    public unpaidInterestBalance: number;
    public principalBalance: number;
    public totalBalance: number;
    public rateChangeRate: number;
    public rateChangeCompounding: number;
}import { TimeValueEvent } from "./timeValueEvent";
