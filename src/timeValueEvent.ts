import { EventType } from "./enums";

// individual line that makes up the TimeValueCashFlowMatrix
// tslint:disable-next-line:interface-name
export interface TimeValueEvent {
    eventDate: Date;
    eventType: EventType;
    eventAmount: number;
    eventNumber: number; // integer 1 to 999
    eventPeriod?: number;
}
