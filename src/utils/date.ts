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
