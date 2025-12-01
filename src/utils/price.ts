export function formatMoneyInput(value: string | number): string {
    const [integer, decimal] = String(value).split(".");
    const formattedInt = parseInt(integer, 10).toLocaleString("en-US");
    return decimal !== undefined ? `${formattedInt}.${decimal}` : formattedInt;
}

export function formatMoneyDisplay(value: number): string {
    if (isNaN(value)) return "0.00";
    const [integer, decimal] = value.toFixed(2).split(".");
    const formattedInt = parseInt(integer, 10).toLocaleString("en-US");
    return `${formattedInt}.${decimal}`;
}
