import { defineStore } from "pinia";
import type { SavingGoal } from "@/types/savingGoal";

export const useSavingGoalStore = defineStore("savingGoal", {
    state: () => ({
        currentGoal: {
            id: "1",
            name: "Buy a house",
            totalAmount: 0,
            reachDate: "", // YYYY-MM
            monthlyAmount: 0,
        } as SavingGoal,
    }),
    getters: {
        totalMonths: (state) => {
            if (!state.currentGoal.reachDate) return 0;
            const today = new Date();
            const [year, month] = state.currentGoal.reachDate
                .split("-")
                .map(Number);
            return (
                (year - today.getFullYear()) * 12 +
                (month - (today.getMonth() + 1))
            );
        },
    },
    actions: {
        updateTotalAmount(amount: number) {
            this.currentGoal.totalAmount = amount;
            this.calculateMonthly();
        },
        updateReachDate(date: string) {
            this.currentGoal.reachDate = date;
            this.calculateMonthly();
        },
        calculateMonthly() {
            const months = this.totalMonths;
            this.currentGoal.monthlyAmount =
                months > 0 ? this.currentGoal.totalAmount / months : 0;
        },
    },
});
