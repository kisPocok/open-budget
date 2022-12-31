import { CSVHandler } from "./csv";
import { MockUtilities } from "./mocks/Utilities";
import { BaseTransactionFormatter } from "./transactionFormatter";
import Transaction from "./transaction";
import * as Converters from "./converter/";

const csvData: string[][] = [
    [
        "2021-11-02 08:05:00",
        "2021-11-02",
        "NAPKÖZBENI ÁTUTALÁS",
        "Bejövő",
        "FIZETÉS",
        "1234567890",
        "Nem kategorizált",
        "Bér 2021/10",
        "Main account",
        "1234567890",
        "100 000",
        "HUF"
    ], [
        "2021-11-02 09:54:28",
        "2021-11-02",
        "OTPDIREKT ÜZENETDÍJ",
        "Kimenő",
        "OTPDIREKT ÜZENETDÍJ",
        "Egyéb",
        "OTPDIREKT ÜZENETDÍJ",
        "AMEX",
        "1234567890",
        "- 370",
        "HUF"
    ], [
        "2021-11-02 18:45:50",
        "2021-11-03",
        "VÁSÁRLÁS KÁRTYÁVAL",
        "Kimenő",
        "SZAMICUKI KFT",
        "Bevásárlás",
        "VÁSÁRLÁS KÁRTYÁVAL   SZAMICUKI KFT            -APPLE",
        "Webkártya",
        "1234567890",
        "-1 675",
        "HUF"
    ]
]

beforeEach(() => {
    jest.restoreAllMocks();
});

const mockUtil = new MockUtilities()
test('App Script CSV parser should be used', () => {
    const dummyCSV = [["a", "aa"],["b", "bb"]]
    jest.spyOn(mockUtil, "parseCsv").mockReturnValue(dummyCSV)
    const csv = new CSVHandler(mockUtil)
    const formatter = new BaseTransactionFormatter()
    jest.spyOn(formatter, "format").mockReturnValue(new Transaction({}))
    
    const data = csv.parse("mocked-already", formatter)

    expect(mockUtil.parseCsv).toHaveBeenCalled()
    expect(data).toHaveLength(2)
});

test('Parse text and return model list', () => {
    const mockUtil = new MockUtilities()
    jest.spyOn(mockUtil, "parseCsv").mockReturnValue(csvData)
    const csv = new CSVHandler(mockUtil)
    const formatter = new Converters.OTP2022()
    jest.spyOn(formatter, "format")

    const data = csv.parse("otpcsv-mocked-already", formatter)

    expect(formatter.format).toHaveBeenNthCalledWith(1, csvData[0])
    expect(formatter.format).toHaveBeenNthCalledWith(2, csvData[1])
    expect(formatter.format).toHaveBeenNthCalledWith(3, csvData[2])
    expect(data).toHaveLength(csvData.length)
});