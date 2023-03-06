import { Config } from "./config";
import Transaction from "./transaction";
import { SimplifiedSpreadsheetApp, SimplifiedSpreadsheet, SimplifiedSheet } from "./types/spreadsheet";
  
export class Database {
    sapp: SimplifiedSpreadsheetApp;
    spreadsheet: SimplifiedSpreadsheet;

    constructor(sapp: SimplifiedSpreadsheetApp) {
        if (typeof sapp === "undefined") {
        throw new Error("SpreadsheetApp not specified!");
        }
        this.sapp = sapp;
        this.spreadsheet = sapp.getActiveSpreadsheet();
    }

    transactionSheet(): SimplifiedSheet {
        return this.spreadsheet.getSheetByName(Config.transactionSheetName);
    }

    write(transactions: Transaction[]) {
        const sheet = this.transactionSheet()
        transactions.forEach((tr: Transaction) => {
            sheet.appendRow(tr.export()) // TODO performance issue
        })

        // applyOnSheet(csvData: string) {
        //   var range = this.transactionSheet().getRange(
        //     _getFirstEmptyRowByColumnArray(), 1, csvData.length, csvData[0].length)
        //   range.setValues(csvData)
        // }
    }

    read(coordinates: string): any[] {
        const sheet = this.transactionSheet()
        return sheet.getRange(coordinates).getValues();
    }

    getTransactions(coordinates: string): Transaction[] {
        const records = this.read(coordinates)
        return records.map((r: (Date | string | number)[]) => new Transaction({
                dueDate: new Date(r[0]),
                account: r[1],
                category: r[2],
                summary: r[3],
                expense: r[4],
                income: r[5],
            })
        )
    }
}
