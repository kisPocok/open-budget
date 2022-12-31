import { dateToYYYYMMDD, skipTheFirstLine } from "./utils";

const exampleDate = "2017-11-30"
const text = "First line\nSecond line\nThird Line";
const csv = "Tranzakció dátuma,Könyvelés dátuma,Típus,Bejövő/Kimenő,Partner neve,Partner számlaszáma/azonosítója,Költési kategória,Közlemény,Számla név,Számla szám,Összeg,Pénznem\n2021-11-02 08:05:00,2021-11-02,NAPKÖZBENI ÁTUTALÁS,Bejövő,FIZETÉS,1234567890,Nem kategorizált,Bér 2021/10,Main account,1234567890,100 000,HUF\n2021-11-02 09:54:28,2021-11-02,OTPDIREKT ÜZENETDÍJ,Kimenő,OTPDIREKT ÜZENETDÍJ,,Egyéb,OTPDIREKT ÜZENETDÍJ,AMEX,1234567890,- 370,HUF\n2021-11-02 18:45:50,2021-11-03,VÁSÁRLÁS KÁRTYÁVAL,Kimenő,SZAMICUKI KFT,,Bevásárlás,VÁSÁRLÁS KÁRTYÁVAL   SZAMICUKI KFT            -APPLE,Webkártya,1234567890,-1 675,HUF\n"
const csvHeadless = "2021-11-02 08:05:00,2021-11-02,NAPKÖZBENI ÁTUTALÁS,Bejövő,FIZETÉS,1234567890,Nem kategorizált,Bér 2021/10,Main account,1234567890,100 000,HUF\n2021-11-02 09:54:28,2021-11-02,OTPDIREKT ÜZENETDÍJ,Kimenő,OTPDIREKT ÜZENETDÍJ,,Egyéb,OTPDIREKT ÜZENETDÍJ,AMEX,1234567890,- 370,HUF\n2021-11-02 18:45:50,2021-11-03,VÁSÁRLÁS KÁRTYÁVAL,Kimenő,SZAMICUKI KFT,,Bevásárlás,VÁSÁRLÁS KÁRTYÁVAL   SZAMICUKI KFT            -APPLE,Webkártya,1234567890,-1 675,HUF\n"

test('Remove the first line', () => {
    expect(skipTheFirstLine(text)).toBe("Second line\nThird Line")
});

test('Remove the first line should contains the data only', () => {
    expect(skipTheFirstLine(csv)).toBe(csvHeadless)
});

test('Formatting date to YYYY-MM-DD format', () => {
    let d = new Date("2017/11/30");
    expect(dateToYYYYMMDD(d)).toBe(exampleDate)

    d = new Date("2017 November 30");
    expect(dateToYYYYMMDD(d)).toBe(exampleDate)

    d = new Date("2017 November 30 19:35:00");
    expect(dateToYYYYMMDD(d)).toBe(exampleDate)
});
