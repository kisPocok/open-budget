import { CSVHandler } from "./csv";
import { Config } from "./config";
import { Importer, Painter } from "./importer";
import { CreateTransactionFormatterByClassName as CreateTransactionConverterByClassName } from "./transactionFormatter";
import { filePicker } from "./ui";
import { skipTheFirstLine } from "./utils";
import CreateMenuButton from "./navigation";
import convertXLStoCSV from "./convertXLStoCSV";
import autoImportRootCSVs from "./autoimport";

function onOpen() {
  Config.availableConverters.forEach((conv) => {
    const callbackName = "import_" + conv.class
    global[callbackName] = () => filePicker(conv.name, conv.class)()
  })
  return CreateMenuButton(Config, SpreadsheetApp)
}

function onEdit(e: any) {
  console.log("Spreadsheet edited")
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global._debug = (): void => {
  console.log("Hello world!")
}
global.onOpen = onOpen()
global.onEdit = onEdit
global.autoImportRootCSVs = () => autoImportRootCSVs(Config, importFile)
global.convertXLStoCSV = () => convertXLStoCSV(Config)
global.importFile = (fileName: string, className: string) => importFile(fileName, className)
global.getOAuthToken = () => {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}

const importFile = (fileName: string, converterClassName: string): boolean => {
  try {
    const imp = new Importer(DriveApp);
    const csvData = imp.readFileFromGDrive(fileName)
    const csv = new CSVHandler(Utilities);
    const converter = CreateTransactionConverterByClassName(converterClassName)
    const data = csv.parse(skipTheFirstLine(csvData), converter)
    const painter = new Painter(SpreadsheetApp)
    painter.paintRows(data)
    return true

  } catch(e: any) {
    console.log("Import failed:", e)
    return false
  }
}
