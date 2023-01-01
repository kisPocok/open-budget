import Transaction from "./transaction";
import { Config } from "./config";

interface SimplifiedDriveApp {
  getFilesByName: (filename: string) => any;
}

export class Importer {
  private gdrive: SimplifiedDriveApp;

  constructor(DriveApp: SimplifiedDriveApp) {
    if (typeof DriveApp === "undefined") {
      throw new Error("DriveApp not specified!");
    }
    this.gdrive = DriveApp;
  }

  readFileFromGDrive(filename: string) {
    try { 
      let file = this.gdrive.getFilesByName(filename).next();
      return file.getBlob().getDataAsString();
    } catch(e: any) {
      //this.importFailed(e.message, e)
      return "";
    }
  }

  importFailed(reason: string, err: any) {
    console.log(reason, err)
  }
}

interface SimplifiedSpreadsheetApp {
  getActiveSpreadsheet: () => SimplifiedSpreadsheet;
}
interface SimplifiedSpreadsheet {
  getSheetByName: (s: string) => any; // should be SimplifiedSheet
}
export declare interface SimplifiedSheet {
  appendRow: (s: Object[]) => any;
}

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

  // applyOnSheet(csvData: string) {
  //   var range = this.transactionSheet().getRange(
  //     _getFirstEmptyRowByColumnArray(), 1, csvData.length, csvData[0].length)
  //   range.setValues(csvData)
  // }
}
