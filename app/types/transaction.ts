export interface TransactionData {
    dueDate: Date;
    account: string;
    category: string;
    summary: string;
    expense: number;
    income: number;
}

export interface TransactionPlan {
    getDueDate(): string
    export(): Object[]
}

export interface TransactionFormatter {
    format(rawTransaction: string): TransactionPlan
    priceToInt(price: string): number
}
