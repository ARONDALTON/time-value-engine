import { EventType } from "./enums";

// tslint:disable-next-line:interface-name
export interface AmortizationLine {
    amortizationLineType: EventType;
    sequence: number;
    days: number;
    date: Date;
    payment: number;
    interest: number;
    principal: number;
    balance: number;
}
