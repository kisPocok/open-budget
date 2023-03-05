import CreateMenuButton from "../navigation";

beforeEach(() => {
    jest.restoreAllMocks();
});

class SpreadsheetApp {
    getUi(): Ui { return new Ui() }
}
class Ui {
    createMenu(label: string): Ui { return this }
    addItem(label: string, callback: string): Ui { return this }
    addSeparator(): Ui { return this }
    addToUi() {}
}

const dummyConfig = (enabledAutoConverter: boolean) => {
    return {
        autoConvertXLSfiles: enabledAutoConverter,
        availableConverters: [
          {name: "OTP", filename: "converter-otp2020", class: "OTP2020"}
        ]
    }
}
const enabledAutoConverter = dummyConfig(true)
const disabledAutoConverter = dummyConfig(false)

test('Menu creation', () => {
    const sapp = new SpreadsheetApp()
    const mockUi = sapp.getUi()
    const ui = jest.spyOn(sapp, "getUi").mockImplementation(() => mockUi)
    jest.spyOn(mockUi, "createMenu")
    jest.spyOn(mockUi, "addItem")
    jest.spyOn(mockUi, "addSeparator")
    jest.spyOn(mockUi, "addToUi")

    CreateMenuButton(enabledAutoConverter, sapp)()

    expect(sapp.getUi).toHaveBeenCalled()
    expect(mockUi.createMenu).toHaveBeenCalledWith("Budget")
    expect(mockUi.addItem).toHaveBeenCalledTimes(2)
    expect(mockUi.addItem).toHaveBeenNthCalledWith(1, "Autoimport from Drive", "autoImportRootCSVs")
    expect(mockUi.addItem).toHaveBeenNthCalledWith(2, "Import from OTP", 'import_'+enabledAutoConverter.availableConverters[0].class)
    expect(mockUi.addSeparator).toHaveBeenCalled()
    expect(mockUi.addToUi).toHaveBeenCalled()
    
});

test('Show converter button on automation disabled', () => {
    const sapp = new SpreadsheetApp()
    const mockUi = sapp.getUi()
    const ui = jest.spyOn(sapp, "getUi").mockImplementation(() => mockUi)
    jest.spyOn(mockUi, "createMenu")
    jest.spyOn(mockUi, "addItem")
    jest.spyOn(mockUi, "addSeparator")
    jest.spyOn(mockUi, "addToUi")

    CreateMenuButton(disabledAutoConverter, sapp)()

    expect(sapp.getUi).toHaveBeenCalled()
    expect(mockUi.createMenu).toHaveBeenCalledWith("Budget")
    expect(mockUi.addItem).toHaveBeenCalledTimes(3)
    expect(mockUi.addItem).toHaveBeenNthCalledWith(1, "Autoimport from Drive", "autoImportRootCSVs")
    expect(mockUi.addItem).toHaveBeenNthCalledWith(2, "Convert XLS -> CSV files", "convertXLStoCSV")
    expect(mockUi.addItem).toHaveBeenNthCalledWith(3, "Import from OTP", 'import_'+disabledAutoConverter.availableConverters[0].class)
    expect(mockUi.addSeparator).toHaveBeenCalled()
    expect(mockUi.addToUi).toHaveBeenCalled()
    
});
