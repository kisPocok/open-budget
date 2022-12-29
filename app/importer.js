const importer = require('./importer');

const helloWorld = () => {
  console.log(_readFileFromGDrive("web.xlsx.csv"));
};

class Importer {
  readFileFromGDrive(filename) {
    try { 
      let file = DriveApp.getFilesByName(filename).next();
      return file.getBlob().getDataAsString();
    } catch(e) {
      return null;
    }
  }
}

module.exports = {
  helloWorld, Importer
};