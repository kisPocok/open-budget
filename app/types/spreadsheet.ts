export interface SimplifiedSpreadsheetApp {
    getActiveSpreadsheet: () => SimplifiedSpreadsheet;
}

export interface SimplifiedSpreadsheet {
    getSheetByName: (s: string) => any; // should be SimplifiedSheet
}

export interface SimplifiedSheet {
    appendRow: (s: Object[]) => any;
    getRange: (s: string) => any;
}