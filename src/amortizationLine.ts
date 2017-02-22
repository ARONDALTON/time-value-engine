import { AmortizationLineType } from "./enums";

export class AmortizationLine {
    amortizationLineType: AmortizationLineType;
    date: Date;
    sequenceNumber: number;
    loan1Amount: number;
    loan2Amount: number;
    loan3Amount: number;
    payment1Amount: number;
    payment2Amount: number;
    payment3Amount: number;
    interestAccrued: number;
    interestPaid: number;
    principalPaid: number;
    unpaidInterestBalance: number;
    principalBalance: number;
    totalBalance: number;
    rateChangeRate: number;
    rateChangeCompounding: number;
}import { TimeValueEvent } from "./timeValueEvent";
