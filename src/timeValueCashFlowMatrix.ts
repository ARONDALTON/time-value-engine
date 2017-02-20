import { ComputeMethod, Compounding, YearLength } from './enums';
import { TimeValueEvent } from './timeValueEvent';
import { TimeValueResult } from './timeValueResult';

// stores information about a particular problem you are trying to solve
export class TimeValueCashFlowMatrix {
    label: string;
    decimalPlaces: number = 2;
    computeMethod: ComputeMethod;
    compounding: Compounding;
    nominalAnnualRate: number;
    yearLength: YearLength;
    public static decimalPlaces: number = 2;
    cashFlowEvents: TimeValueEvent[] = [];

    calculate() : TimeValueResult {
        return new TimeValueResult();
    }
}