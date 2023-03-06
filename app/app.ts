import { CSVHandler } from "./csv";
import { getTransactions } from "./categorizer";
import { Config } from "./config";
import { Importer } from "./importer";
import { Painter } from "./painter";
import { CreateTransactionFormatterByClassName as CreateTransactionConverterByClassName } from "./transactionFormatter";
import { filePicker } from "./ui";
import { skipTheFirstLine } from "./utils";
import CreateMenuButton from "./navigation";
import convertXLStoCSV from "./convertXLStoCSV";
import autoImportRootCSVs from "./autoimport";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global._debug = (): void => {
  console.log("Debugging...")
  const painter = new Painter(SpreadsheetApp)
  const trs = getTransactions(painter)
  console.log(trs[0])
}

function onOpen() {
  Config.availableConverters.forEach((c) => {
    const callbackName = "import_" + c.class
    global[callbackName] = () => filePicker(c.name, c.class)()
  })
  return CreateMenuButton(Config, SpreadsheetApp)
}

function onEdit(e: any) {
  console.log("Spreadsheet edited")
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
    const csv = new CSVHandler(Utilities);
    const csvData = imp.readFileFromGDrive(fileName)
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
