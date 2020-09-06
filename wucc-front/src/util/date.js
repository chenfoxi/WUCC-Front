import moment from "moment";
moment.locale('en-nz');
export default function convertDateFormat(dateString) {
    // '2020-09-03T23:01:58.000+00:00'
    let date = moment(dateString);
    return date.format('llll');
}
