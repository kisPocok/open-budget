export function skipTheFirstLine(text: string): string {
    const headLane = text.split('\n', 1)[0]
    return text.substr(headLane.length + 1)
}

// mehet valami mas helyre
export function dateToYYYYMMDD(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
