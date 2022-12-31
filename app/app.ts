import { CSVHandler } from "./csv";
import { Config } from "./config";
import { Importer, Painter } from "./importer";
import { TransactionFormatter } from "./transactionFormatter";
import CreateMenuButton from "./navigation";
import * as Converters from "./converter/";
import { skipTheFirstLine } from "./utils";

function onOpen() {
  const createInstance = (className: string): TransactionFormatter => {
    return new (<any>Converters)[className]();
  } 
  Config.availableConverters.forEach((item) => {
    const callbackName = "import_" + item.class
    global[callbackName] = () => {
      const imp = new Importer(DriveApp);
      const csvData = imp.readFileFromGDrive("web.xlsx.csv") // TODO selector kell
      const painter = new Painter(SpreadsheetApp)
      const csv = new CSVHandler(Utilities);
      const formatter = createInstance(item.class)
      const data = csv.parse(skipTheFirstLine(csvData), formatter)
      painter.paintRows(data)
    }
  })
  return CreateMenuButton(Config, SpreadsheetApp)
}

function onEdit(e: any) {
  console.log("Spreadsheet edited")
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global._debug = (): void => {
  // console.log("Hello World!")
  // const imp = new Importer(DriveApp);
  // const csvData = imp.readFileFromGDrive("web.xlsx.csv")
  // console.log(csvData);
  // const painter = new Painter(SpreadsheetApp)
  // const csv = new CSVHandler(Utilities);
  // const data = csv.parse(csvData, (new OTP2022()))
  // painter.paintRows(data)
}

global.onOpen = onOpen()
global.onEdit = onEdit
