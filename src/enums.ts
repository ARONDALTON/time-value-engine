export enum AmortizationLineType {
    TVRateChangeLine = 4,
    TVLoanLine = 8,
    TVPaymentLine = 9,
    TVDepositLine = 10,
    TVWithdrawalLine = 11,
    TVUserLoan1Line = 12,
    TVUserLoan2Line = 16,
    TVUserLoan3Line = 17,
    TVUserPayment1Line = 13,
    TVUserPayment2Line = 18,
    TVUserPayment3Line = 19,
    TVUserDeposit1Line = 14,
    TVUserDeposit2Line = 20,
    TVUserDeposit3Line = 21,
    TVUserWithdrawal1Line = 15,
    TVUserWithdrawal2Line = 22,
    TVUserWithdrawal3Line = 23,
    TVMonthTotalLine = 49,
    TVQuarterTotalLine = 50,
    TVAnnualTotalLine = 51,
    TVGrandTotalLine = 52
}

export enum Compounding {
    TVWeeklyCompound = 52,
    TVBiWeeklyCompound = 26,
    TVHalfMonthCompound = 24,
    TVMonthlyCompound = 12,
    TVTwoMonthCompound = 6,
    TVQuarterlyCompound = 4,
    TVFourMonthCompound = 3,
    TVFourWeekCompound = 13,
    TVSemiannualCompound = 2,
    TVAnnualCompound = 1,
    TVContinuousCompound = 100,
    TVExactDaysCompound = 101,
    TVDailyCompound = 102,
    TVNoCompound = 103
}

export enum ComputeMethod {
    TVNormalAmortization = 0,
    TVRule78Amortization = 1,
    TVUSRuleAmortization = 2,
    TVCanadianAmortization = 3
}

export enum EventType {
    TVCommentEvent = 1,
    TVRateChangeEvent = 4,
    TVLoanEvent = 8,
    TVPaymentEvent = 9,
    TVDepositEvent = 10,
    TVWithdrawalEvent = 11,
    TVUserLoanEvent1 = 12,
    TVUserLoanEvent2 = 16,
    TVUserLoanEvent3 = 17,
    TVUserPaymentEvent1 = 13,
    TVUserPaymentEvent2 = 18,
    TVUserPaymentEvent3 = 19,
    TVUserDepositEvent1 = 14,
    TVUserDepositEvent2 = 20,
    TVUserDepositEvent3 = 21,
    TVUserWithdrawalEvent1 = 15,
    TVUserWithdrawalEvent2 = 22,
    TVUserWithdrawalEvent3 = 23
}

export enum TV_UNKNOWN {
    AMOUNT = -10000000000,
    RATE = -10000000001,
    EVENT_NUMBER = -10000000002
}

export enum YearLength {
    Y_360 = 360,
    Y_364 = 364,
    Y_365 = 365
}