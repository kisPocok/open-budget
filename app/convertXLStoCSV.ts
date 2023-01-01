interface necessaryConfig {
    // autoConvertXLSfiles: boolean
    autoRemoveConvertedFiles: boolean
}

export default function convertXLStoCSV(config:necessaryConfig): void {
    const oauthToken = ScriptApp.getOAuthToken()
    const sourceFolder = DriveApp.getRootFolder()
    const targetFolder = DriveApp.getRootFolder()
    const mimes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
  
    for (var m = 0; m < mimes.length; m++) {
        let files = sourceFolder.getFilesByType(mimes[m]);
        while (files.hasNext()) {
            const sourceFile = files.next();
            console.log(sourceFile.getName())
            // Re-upload the XLS file after convert in Google Sheet format
            const googleSheet = JSON.parse(
                UrlFetchApp
                    .fetch('https://www.googleapis.com/upload/drive/v2/files?uploadType=media&convert=true', {
                        method: 'post',
                        contentType: 'application/vnd.ms-excel',
                        payload: sourceFile.getBlob().getBytes(),
                        headers: {
                            Authorization: 'Bearer ' + oauthToken,
                        }
                    })
                    .getContentText()
            );

            // The exportLinks object has a link to the converted CSV file
            var targetFile = UrlFetchApp.fetch(googleSheet.exportLinks['text/csv'], {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + oauthToken,
                }
            });

            // Save the CSV file in the destination folder
            targetFolder
                .createFile(targetFile.getBlob())
                .setName(sourceFile.getName() + '-converted.csv');

            // Delete the processed files
            trashFile(googleSheet.id)
            sourceFile.setTrashed(config.autoRemoveConvertedFiles);
        }
    }
}
  
function getFileByID(id: string) {
    try {
        return DriveApp.getFileById(id);
    } catch(e) {
        Logger.log("Hiba, nincs meg a fájl: %s", e)
        return null;
    }
}

function trashFile(id: string) {
    var tempFile = getFileByID(id)
    if (tempFile) {
        return tempFile.setTrashed(true);
    }
    return null;
}
