import moment from "moment";
moment.locale('en-nz');
export function convertDateTimeFormat(dateString) {
    // '2020-09-03T23:01:58.000+00:00'
    let date = moment(dateString);
    return date.format('llll');
}

export function beforeDate(compDateString) {
    return moment().isBefore(compDateString);

}

export function convertDateFormat(dateStr, format='MMM Do YYYY') {
    let date = moment(dateStr);
    return date.format(format);
}

export function convertWeekdayFormat(weekDay) {
    let date = moment().day(weekDay);
    return date.format('dddd');
}
