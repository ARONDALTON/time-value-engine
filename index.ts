
// stores user preferences
export class TimeValueUser {

}

// stores information about a particular problem you are trying to solve
export class TimeValueCashFlowMatrix {

}

// individual line that makes up the TimeValueCashFlowMatrix
export interface TimeValueEvent {

}

export interface LoanParameters {
    amount: number;
    interest: number;
    term: number;
}

//monthlyPayment = amount * (periodInt / (1 - Math.pow(1 + periodInt, -(totalTerm))));


export function PaymentOnFixedRateLoan(p: LoanParameters): number {
    let pInt = p.interest / 12;
    let monthlyPayment = p.amount * ( pInt / (1 - Math.pow(1 + pInt, -(p.term))));
    return monthlyPayment;
}