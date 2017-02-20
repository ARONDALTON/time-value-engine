import { EventType } from './enums';

// individual line that makes up the TimeValueCashFlowMatrix
export class TimeValueEvent {
    eventDate: Date;
    eventType: EventType;
    eventAmount: number;
    eventNumber: number; // integer 1 to 999
}