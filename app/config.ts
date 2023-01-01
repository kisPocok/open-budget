interface Converter {
  name: string
  class: string
  filePatternRegex: RegExp
}
interface ConfigDataset {
  developerKey: string
  transactionSheetName: string
  autoConvertXLSfiles: boolean
  autoRemoveConvertedFiles: boolean
  availableConverters: Converter[]
}

export const Config:ConfigDataset = {
  // IMPORTANT: Replace the value for DEVELOPER_KEY with the API key obtained
  // from the Google Developers Console.
  // Key from: https://console.cloud.google.com/apis/credentials?project=project-id-8771731482318092468
  developerKey: "",

  // Would you support additional (BANK) source?
  // 1) Add additional line below
  // 2) Make a copy one of "converter/converter-*" file
  // 3) Adjust your importer format() method!
  availableConverters: [
    {name: 'OTP', class: 'OTP2022', filePatternRegex: new RegExp(/^otp(.*)\.csv$/i)},
    {name: 'Revolut', class: 'Revolut', filePatternRegex: new RegExp(/^revolut(.*)\.csv$/i)},
  ],

  // XLS -> CSV conversation
  autoConvertXLSfiles: true, // auto-convert XLS to CSV (CSV is the only supported version)
  autoRemoveConvertedFiles: false, // auto-remove processed XLS files

  // Name of the transaction sheet (you have to update it if you rename the sheet on the UI!)
  transactionSheetName: "Tranzakciók",
  
}
