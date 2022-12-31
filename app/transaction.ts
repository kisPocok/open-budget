import { dateToYYYYMMDD } from "./utils";

interface TransactionData {
    dueDate: Date;
    account: string;
    category: string;
    summary: string;
    expense: number;
    income: number;
}

export default class Transaction {
    dueDate!: Date;
    account: string = "";
    category: string = "";
    summary: string = "";
    expense: number = 0;
    income: number = 0;
    confirmed: boolean = false;

    constructor(data: Object) {
        Object.assign(this, data)
        this.confirmed = false;
    }

    getDueDate(): string {
        if (!this.dueDate) {
            return ""
        }
        return dateToYYYYMMDD(this.dueDate);
    }

    export(): Object[] {
        return [
            this.getDueDate(),
            this.account,
            this.category,
            this.summary,
            this.expense,
            this.income,
            this.confirmed ? "Yes" : "No",
        ]
    }
}
