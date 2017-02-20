export { TimeValueAmortizationSchedule } from './src/timeValueAmortizationSchedule';
export { TimeValueCashFlowMatrix } from './src/timeValueCashFlowMatrix';
export { TimeValueEvent } from './src/timeValueEvent';
export { TimeValueResult } from './src/timeValueResult';
export { Compounding, ComputeMethod, EventType, TV_UNKNOWN, YearLength } from './src/enums';

export interface LoanParameters {
    amount: number;
    interest: number;
    term: number;
}

export function PaymentOnFixedRateLoan(p: LoanParameters): number {
    let pInt = p.interest / 12;
    let monthlyPayment = p.amount * ( pInt / (1 - Math.pow(1 + pInt, -(p.term))));
    return monthlyPayment;
}