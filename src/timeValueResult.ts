import { AmortizationLine } from "./amortizationLine";

// tslint:disable-next-line:interface-name
export interface TimeValueResult {
    dailyRate: number;
    unknownValue: number;
    roundingAmount: number;
    roundingDate: Date;
    iterations: number;
    amortizationSchedule: AmortizationLine[];
}
