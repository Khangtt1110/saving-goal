export function formatMonthYear(
    date: Date,
    options: { month?: "short" | "long" } = {},
) {
    // Config to show full name of month
    const { month = "long" } = options;

    return {
        month: date.toLocaleString("en-US", { month }),
        year: date.getFullYear(),
    };
}

export function getNextMonthDate(): Date {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return nextMonth;
}
