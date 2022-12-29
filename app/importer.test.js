//const assert = require('assert');
const importer = require('./importer');
const driveMock = require('../mocks/DriveApp');
//const gasmask = require('gasmask-extended');

beforeEach(() => {
    global.DriveApp = new driveMock.DriveApp();
    jest.restoreAllMocks();
});

test('Reading file calls DriveApp and search by filename', () => {
    const filename = "example-filename";
    const imp = new importer.Importer();
    const drive = jest.spyOn(DriveApp, 'getFilesByName');
    
    imp.readFileFromGDrive(filename);
  
    expect(drive).toHaveBeenCalled();
    expect(drive).toHaveBeenCalledWith(filename);
});

test('File not found returns null', () => {
    const imp = new importer.Importer();
    const getFilesByName = jest.spyOn(DriveApp, 'getFilesByName');
    getFilesByName.mockImplementation(() => {
        throw new Error("Fake error");
    });
    
    const loading = imp.readFileFromGDrive();
  
    expect(loading).toBe(null);
});

test('Run importer', () => {
    const imp = new importer.Importer();
    expect(imp.readFileFromGDrive("random-file-name")).toBe("Hello world!");
});
