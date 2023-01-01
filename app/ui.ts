import { Config } from "./config";

export function filePicker(converterName: string, converterClass: string): Function {
    return () => {
        var html = HtmlService.createTemplateFromFile('filePicker.html');
        html.developerKey = Config.developerKey;
        html.converter = converterName;
        html.converterClass = converterClass;
        var htmlOutput = html
            .evaluate()
            .setWidth(600)
            .setHeight(425)
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
        SpreadsheetApp.getUi()
            .showModalDialog(htmlOutput, 'Select a file to import as ' + converterName);
    }
}
