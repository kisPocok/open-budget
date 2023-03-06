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
