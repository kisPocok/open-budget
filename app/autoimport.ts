import convertXLStoCSV from "./convertXLStoCSV";

interface necessaryConfig {
    autoConvertXLSfiles: boolean
    autoRemoveConvertedFiles: boolean
    availableConverters: Converter[]
}
interface Converter {
    name: string
    class: string
    filePatternRegex: RegExp
}

export default function autoImportRootCSVs(config: necessaryConfig, importCallback: Function) {
    Logger.log("Autoimport: Running");

    if (config.autoConvertXLSfiles) {
        Logger.log("Autoimport: convert XLSX files to CSV");
        convertXLStoCSV(config)
    }

    Logger.log("Autoimport: importing");
    const files = listCSVFilenamesFromTheRootFolder()
    files.forEach((filename) => {
        Logger.log("Autoimport: New file '%s' has found, importing...", filename);
        const conv = findConverter(filename, config.availableConverters)
        const success = importCallback(filename, conv.class)
        Logger.log("Autoimport: %s type is %s", filename, conv.name);
        Logger.log("Autoimport: File import %s", success ? "succeeded" : "failed");
    })

    Logger.log("Autoimport: showing results");
    showImportResult(files)
    Logger.log("Autoimport: Done");
}

export const findConverter = (filename: string, converters: Converter[]): Converter => {
    const find = converters.filter((c) => {
        return c.filePatternRegex.test(filename)
    })
    
    if (find.length > 0) {
        return find[0]
    }

    throw new Error("Unsupported format: " + filename)
}

const listCSVFilenamesFromTheRootFolder = () => {
    let csvs = [];
    const files = DriveApp
        .getRootFolder()
        .getFilesByType("text/csv");
    while (files.hasNext()) {
        const file = files.next();
        csvs.push(file.getName());
    }
    return csvs;
}

const showImportResult = (filenames: string[]) => {
    const modal = HtmlService
        .createHtmlOutput('<p>Imported files:</br>' + filenames.join("</br>") + '</p>')
        .setWidth(320)
        .setHeight(240);
    return SpreadsheetApp.getUi().showModalDialog(modal, 'Import is done 😎');
}
