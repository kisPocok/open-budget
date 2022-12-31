export default function CreateMenuButton(config: any, SpreadsheetApp: any): Function {
    return function() {
        const ui = SpreadsheetApp.getUi();
        const menu = ui.createMenu('Budget')
            .addItem('Autoimport from Drive', 'autoImportRootCSVs')
            .addSeparator()
    
        config.availableConverters.forEach((c: {name: string, class: string}) => {
            menu.addItem('Import from ' + c.name, 'import_'+c.class) // TODO
        })
    
        menu.addToUi()
    }
}
