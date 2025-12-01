import { defineStore } from "pinia";
import { formatMonthYear, getNextMonthDate } from "@/utils/date";
import { formatMoneyInput, formatMoneyDisplay } from "@/utils/price";
import type { SavingGoal } from "@/types/savingGoal";

export const useSavingGoalStore = defineStore("savingGoal", {
    state: () => ({
        currentGoal: {
            id: "1",
            name: "Buy a house",
            totalAmount: 0,
            totalAmountInput: "0",
            reachDate: getNextMonthDate(),
            monthlyAmount: 0,
        } as SavingGoal,
        depositSummary: `You’re planning <strong>0</strong> monthly deposits to reach your <strong>$0.00</strong> goal by <strong>${formatMonthYear(getNextMonthDate()).month} ${formatMonthYear(getNextMonthDate()).year}</strong>.`,
    }),

    getters: {
        totalMonths: (state) => {
            const reach = state.currentGoal.reachDate;
            if (!reach) return 0;

            const today = new Date();
            today.setDate(1);
            return (
                (reach.getFullYear() - today.getFullYear()) * 12 +
                (reach.getMonth() - today.getMonth())
            );
        },

        reachDateDisplay: (state) => {
            const reach = state.currentGoal.reachDate;
            if (!reach) return "";
            return formatMonthYear(reach);
        },

        reachDateParts: (state) => {
            const reach = state.currentGoal.reachDate;
            if (!reach) return { month: "", year: "" };
            return {
                month: reach.toLocaleString("en-US", { month: "long" }),
                year: reach.getFullYear(),
            };
        },
    },

    actions: {
        updateTotalAmountFromInput(input: string) {
            const sanitized = input.replace(/[^\d.]/g, "");

            if (sanitized === "" || sanitized === ".") {
                this.currentGoal.totalAmountInput = sanitized;
                this.currentGoal.totalAmount = 0;
                return;
            }

            this.currentGoal.totalAmountInput = formatMoneyInput(sanitized);

            const number = parseFloat(sanitized);
            this.currentGoal.totalAmount = isNaN(number) ? 0 : number;
        },

        calculateMonthly() {
            const months = this.totalMonths;
            this.currentGoal.monthlyAmount =
                months > 0 ? this.currentGoal.totalAmount / months : 0;

            // cập nhật summary
            const goal = this.currentGoal;
            const total = formatMoneyDisplay(goal.totalAmount);
            const targetMonth = goal.reachDate
                ? formatMonthYear(goal.reachDate, { month: "long" }).month
                : "";
            const targetYear = goal.reachDate
                ? formatMonthYear(goal.reachDate, { month: "long" }).year
                : "";

            this.depositSummary = `You’re planning <strong>${months}</strong> monthly deposits to reach your <strong>$${total}</strong> goal by <strong>${targetMonth} ${targetYear}</strong>.`;
        },

        incrementMonth() {
            if (!this.currentGoal.reachDate)
                this.currentGoal.reachDate = new Date();
            const newDate = new Date(this.currentGoal.reachDate);
            newDate.setMonth(newDate.getMonth() + 1);
            this.currentGoal.reachDate = newDate;
        },

        decrementMonth() {
            if (!this.currentGoal.reachDate)
                this.currentGoal.reachDate = new Date();
            const newDate = new Date(this.currentGoal.reachDate);
            newDate.setMonth(newDate.getMonth() - 1);

            const today = new Date();
            today.setDate(1);
            if (newDate >= today) {
                this.currentGoal.reachDate = newDate;
            }
        },
    },
});
