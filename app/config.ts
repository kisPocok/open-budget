interface ImporterSchema {
  name: string
  class: string
}

interface ConfigDataset {
  transactionSheetName: string
  availableConverters: ImporterSchema[]
}

export const Config:ConfigDataset = {
  // tranzakciok sheet neve (ha UI-on modositod valtoztatni kell ezt is!)
  transactionSheetName: "Tranzakciók",
  
  // ide illeszthetoek be mas bankok konverterei
  availableConverters: [
    {name: 'OTP', class: 'OTP2022'},
    {name: 'Revolut', class: 'Revolut'},
  ]
}
