export function formatSmallCurrency(amount: number) {
    return '$' + Math.ceil(1_000_000 * amount) / 1_000_000;
}
