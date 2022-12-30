import { Transaction, CSVHandler } from "./csv";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global._debug = (): void => {
  console.log("Hello World!")
  const imp = new Importer(DriveApp);
  const csvData = imp.readFileFromGDrive("web.xlsx.csv")
  console.log(csvData);
  const painter = new Painter(SpreadsheetApp)

  const csv = new CSVHandler(Utilities);
  const data = csv.parse(csvData)
  painter.paintRows(data)
};

const config = {
  transactionSheetName: "Tranzakciók"
}

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

  applyOnSheet(csvData: string) {
    // var range = _getTransactionsSheet().getRange(
    //   _getFirstEmptyRowByColumnArray(), 1, csvData.length, csvData[0].length)
    // range.setValues(csvData)
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
    return this.spreadsheet.getSheetByName(config.transactionSheetName);
  }

  paintRows(transactions: Transaction[]) {
    const sheet = this.transactionSheet()
    //console.log(transactions)
    transactions.forEach((tr) => {
      //console.log(tr);
      sheet.appendRow(tr.export());
    }); 
  }
}
