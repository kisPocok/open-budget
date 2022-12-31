import Transaction from "./transaction";

const d = "2017-11-30";
const date = new Date(d);
const account = "dummy-account"
const category = "dummy-category"
const summary = "dummy-summary"
const income = 100
const expense = 250

beforeEach(() => {
    jest.restoreAllMocks();
});

test('Empty transaction looks like', () => {
    const tr = new Transaction({})
    expect(tr.getDueDate()).toBe("")
    expect(tr.account).toBe("")
    expect(tr.category).toBe("")
    expect(tr.summary).toBe("")
    expect(tr.income).toBe(0)
    expect(tr.expense).toBe(0)
    expect(tr.confirmed).toBeFalsy()
});

test('Populated transaction looks like', () => {
    const tr = new Transaction({
        dueDate: date,
        account: account,
        category: category,
        summary: summary,
        income: income,
        expense: expense,
    })
    expect(tr.dueDate).toBe(date)
    expect(tr.getDueDate()).toBe(d)
    expect(tr.account).toBe(account)
    expect(tr.category).toBe(category)
    expect(tr.summary).toBe(summary)
    expect(tr.income).toBe(income)
    expect(tr.expense).toBe(expense)
    expect(tr.confirmed).toBeFalsy()
});
