import { Config } from "./config";
import Transaction from "./transaction";
import { SimplifiedSpreadsheetApp, SimplifiedSpreadsheet, SimplifiedSheet } from "./types/spreadsheet";
  
export class Painter {
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

    paintRows(transactions: Transaction[]) {
        const sheet = this.transactionSheet()
        transactions.forEach((tr: Transaction) => {
        sheet.appendRow(tr.export()); // TODO performance issue
        }); 
    }

    readRows(coordinates: string) {
        const sheet = this.transactionSheet()
        return sheet.getRange(coordinates).getValues();
    }

    // applyOnSheet(csvData: string) {
    //   var range = this.transactionSheet().getRange(
    //     _getFirstEmptyRowByColumnArray(), 1, csvData.length, csvData[0].length)
    //   range.setValues(csvData)
    // }
}
  