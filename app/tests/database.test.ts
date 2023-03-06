import { Config } from "../config";
import { Database } from "../database";
import { SpreadsheetApp } from 'gasmask';


test('Transaction without data return empty', () => {
    const mockSpreadsheetApp = jest.spyOn(SpreadsheetApp, 'getActiveSpreadsheet')
    const db = new Database(SpreadsheetApp)
    const mockSpreadsheet = jest.spyOn(db, 'read').mockReturnValue([])
    
    const transactions = db.getTransactions("A1:F")
    
    expect(mockSpreadsheet).toHaveBeenCalledWith("A1:F")
    expect(transactions.length).toBe(0)
});

test('Transaction returns two records', () => {
    const birthday = "2017-11-30"
    const db = new Database(SpreadsheetApp)
    const row1 = [new Date(birthday), "dummy-account", "dummy-category", "dummy-summary", 100, 0]
    const row2 = [new Date(), "dummy-account2", "dummy-category2", "dummy-summary2", 0, 50]
    const mockSpreadsheet = jest.spyOn(db, 'read').mockReturnValue([row1, row2])
    
    const transactions = db.getTransactions("A1:F")
    
    expect(mockSpreadsheet).toHaveBeenCalledWith("A1:F")
    expect(transactions.length).toBe(2)
    expect(transactions[0].getDueDate()).toBe(birthday)
    expect(transactions[0].account).toBe("dummy-account")
    expect(transactions[0].category).toBe("dummy-category")
    expect(transactions[0].summary).toBe("dummy-summary")
    expect(transactions[0].expense).toBe(100)
    expect(transactions[0].income).toBe(0)
    expect(transactions[1].summary).toBe("dummy-summary2")
});
