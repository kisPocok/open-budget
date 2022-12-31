import { TransactionFormatter } from "./transactionFormatter";

export interface GoogleUtilities {
    parseCsv(s: string): string[][]
}

export class CSVHandler {
    gutil: any;
    constructor(utilitiesLib: GoogleUtilities) {
        this.gutil = utilitiesLib
    }

    parse(blob: string, formatter: TransactionFormatter) {
        return this.gutil
            .parseCsv(blob, ",")
            .filter((raw: string) => raw != "" ) // skip empty lines
            .map((raw: string) => formatter.format(raw))
    }
}
