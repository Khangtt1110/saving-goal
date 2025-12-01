export interface SavingGoal {
    id: string;
    name: string;
    totalAmount: number;
    totalAmountInput?: string;
    reachDate: Date | null;
    monthlyAmount: number;
}
