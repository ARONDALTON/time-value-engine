export interface ILoanParameters {
    amount: number;
    interest: number;
    term: number;
}

export function PaymentOnFixedRateLoan(p: ILoanParameters): number {
    const pInt = p.interest / 12;
    const monthlyPayment = p.amount * ( pInt / (1 - Math.pow(1 + pInt, -(p.term))));
    return monthlyPayment;
}

export function FutureValue(pv: number, interest: number, n: number): number {
    const multiplier = Math.pow((1 + interest), n);
    return (pv * multiplier);
}


describe("should calculate payment on a fixed rate loan", () => {
    it("should equal 699.21", () => {
        const params: ILoanParameters = {
            amount: 100000,
            interest: 0.075,
            term: 360,
        };

        const monthlyPayment = +(PaymentOnFixedRateLoan(params).toFixed(2));
        const tvAnswer = 699.21;
        expect(monthlyPayment).toEqual(tvAnswer);
    });
});

describe("future value tests", () => {
    it("should equal 105.00", () => {
        const pv: number = 100;
        const interest: number = .05;
        const n: number = 1;
        const answer = FutureValue(pv, interest, n);
        expect(answer).toBe(105);
    });
});
