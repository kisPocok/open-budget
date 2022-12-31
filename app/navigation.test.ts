import CreateMenuButton from "./navigation";

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

const dummyConfig = {
    availableConverters: [
      {name: "OTP", filename: "converter-otp2020", class: "OTP2020"}
    ]
}

test('Menu creation', () => {
    const sapp = new SpreadsheetApp()
    const mockUi = sapp.getUi()
    const ui = jest.spyOn(sapp, "getUi").mockImplementation(() => mockUi)
    jest.spyOn(mockUi, "createMenu")
    jest.spyOn(mockUi, "addItem")
    jest.spyOn(mockUi, "addSeparator")
    jest.spyOn(mockUi, "addToUi")

    CreateMenuButton(dummyConfig, sapp)()

    expect(sapp.getUi).toHaveBeenCalled()
    expect(mockUi.createMenu).toHaveBeenCalledWith("Budget")
    expect(mockUi.addItem).toHaveBeenCalledTimes(1 + dummyConfig.availableConverters.length)
    expect(mockUi.addItem).toHaveBeenNthCalledWith(1, "Autoimport from Drive", "autoImportRootCSVs")
    expect(mockUi.addItem).toHaveBeenNthCalledWith(2, "Import from OTP", 'import_'+dummyConfig.availableConverters[0].class)
    expect(mockUi.addSeparator).toHaveBeenCalled()
    expect(mockUi.addToUi).toHaveBeenCalled()
    
});
