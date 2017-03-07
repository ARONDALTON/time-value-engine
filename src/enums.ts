
export enum Compounding {
    DailyCompound = 365,
    WeeklyCompound = 52,
    BiWeeklyCompound = 26,
    HalfMonthCompound = 24,
    FourWeekCompound = 13,
    MonthlyCompound = 12,
    TwoMonthCompound = 6,
    QuarterlyCompound = 4,
    FourMonthCompound = 3,
    SemiannualCompound = 2,
    AnnualCompound = 1,
    ContinuousCompound = 0,
}

export enum ComputeMethod {
    NormalAmortization = 0,
    Rule78Amortization = 1,
    USRuleAmortization = 2,
    CanadianAmortization = 3,
}

export enum EventType {
    CommentEvent = 1,
    RateChangeEvent = 4,
    LoanEvent = 8,
    PaymentEvent = 9,
    DepositEvent = 10,
    WithdrawalEvent = 11,
    UserLoanEvent1 = 12,
    UserLoanEvent2 = 16,
    UserLoanEvent3 = 17,
    UserPaymentEvent1 = 13,
    UserPaymentEvent2 = 18,
    UserPaymentEvent3 = 19,
    UserDepositEvent1 = 14,
    UserDepositEvent2 = 20,
    UserDepositEvent3 = 21,
    UserWithdrawalEvent1 = 15,
    UserWithdrawalEvent2 = 22,
    UserWithdrawalEvent3 = 23,
}

export enum UNKNOWN {
    AMOUNT = -10000000000,
    RATE = -10000000001,
    EVENT_NUMBER = -10000000002,
}

export enum YearLength {
    Y_360 = 360,
    Y_364 = 364,
    Y_365 = 365,
}
