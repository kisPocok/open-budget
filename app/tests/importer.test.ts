import Transaction from '../transaction';
import { Importer } from '../importer';
import { Painter } from '../painter';
import { MockDriveApp } from '../mocks/DriveApp';
import { MockSheet } from '../mocks/Spreadsheet';
import { SpreadsheetApp } from 'gasmask';

const filename = "example-filename";
let mockedDrive = new MockDriveApp();
const generateDummyTransaction = (summary: string) => new Transaction({summary: summary})

beforeEach(() => {
    jest.restoreAllMocks();
});

test('Testing nothing but jest itself', () => {
    const imp = new Importer(mockedDrive);
    const drive = jest.spyOn(imp, 'readFileFromGDrive');
    
    imp.readFileFromGDrive(filename);
  
    expect(drive).toHaveBeenCalled();
    expect(drive).toHaveBeenCalledWith(filename);
});

test('Reading file calls DriveApp and search by filename', () => {
    const filename = "example-filename";
    const imp = new Importer(mockedDrive);
    const drive = jest.spyOn(mockedDrive, 'getFilesByName');
    
    imp.readFileFromGDrive(filename);
  
    expect(drive).toHaveBeenCalled();
    expect(drive).toHaveBeenCalledWith(filename);
});

test('File not found returns null', () => {
    const imp = new Importer(mockedDrive);
    const getFilesByName = jest.spyOn(mockedDrive, 'getFilesByName');
    getFilesByName.mockImplementation(() => {
        throw new Error("Fake error");
    });
    
    const loading = imp.readFileFromGDrive("");
  
    expect(loading).toBe("");
});

test('Run importer', () => {
    const imp = new Importer(mockedDrive);
    expect(imp.readFileFromGDrive("random-file-name")).toBe("Hello world!");
});

test('Painter expect to wrap SpreadsheetApp and Spreadsheet', () => {
    const mockSpreadsheetApp = jest.spyOn(SpreadsheetApp, 'getActiveSpreadsheet');
    const painter = new Painter(SpreadsheetApp)
    const mockSpreadsheet = jest.spyOn(painter.spreadsheet, 'getSheetByName');
   
    painter.transactionSheet();

    expect(mockSpreadsheetApp).toHaveBeenCalled();
    expect(mockSpreadsheet).toHaveBeenCalledWith("Tranzakciók"); // hardcoded
});

test('Painter append row', () => {
    const dummyCSV = [
        generateDummyTransaction("a"),
        generateDummyTransaction("b"),
        generateDummyTransaction("c")
    ]
    const mockSpreadsheetApp = jest.spyOn(SpreadsheetApp, 'getActiveSpreadsheet');
    const painter = new Painter(SpreadsheetApp)
    const mockSheet = new MockSheet()
    jest.spyOn(mockSheet, "appendRow")
    jest.spyOn(painter.spreadsheet, "getSheetByName")
        .mockReturnValue(mockSheet)

    painter.paintRows(dummyCSV)

    dummyCSV.forEach((tr, index) => {
        expect(mockSheet.appendRow).toHaveBeenNthCalledWith(index+1, tr.export());
    }); 
});
