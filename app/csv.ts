export function skipTheFirstLine(text: string): string {
    const headLane = text.split('\n', 1)[0]
    return text.substr(headLane.length + 1)
}

// mehet valami mas helyre
export function dateToYYYYMMDD(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


//var data = Utilities.parseCsv(csvString, '\t');

interface TransactionData {
    dueDate: Date;
    account: string;
    category: string;
    summary: string;
    expense: number;
    income: number;
}

export class Transaction {
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

export interface GoogleUtilities {
    parseCsv(s: string): string[][]
}

export class CSVHandler {
    gutil: any;
    constructor(utilitiesLib: GoogleUtilities) {
        this.gutil = utilitiesLib
    }
    parse(blob: string) {
        return this.gutil.parseCsv(blob, ",").map(function(rawData: string) {
            return new Transaction({});
        }).filter(function(tr: Transaction) {
            // skip empty items
            return tr != null
        });
    }
}
