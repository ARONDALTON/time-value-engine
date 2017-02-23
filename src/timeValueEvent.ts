import { EventType } from "./enums";

// individual line that makes up the TimeValueCashFlowMatrix
export class TimeValueEvent {
    public eventDate: Date;
    public eventType: EventType;
    public eventAmount: number;
    public eventNumber: number; // integer 1 to 999
}
