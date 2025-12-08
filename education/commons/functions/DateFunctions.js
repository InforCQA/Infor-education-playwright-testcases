import BaseClass from "../../testBase/BaseClass";
import { format as formatDate } from 'date-fns';
import DateFormats from "../constants/DateFormats";

class DateFunctions extends BaseClass {

    static async nextWeekDate(day, format) {

        const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const target = WEEKDAYS.findIndex(
            dw => dw.toLowerCase() === day.trim().toLowerCase()
        );

        if (target === -1) throw new TypeError(`Invalid weekday "${day}"`);

        const now = new Date();
        const today = now.getDay();
        // getNextWeekdayByName algorithm: ((7 + target − today) % 7) || 7
        const daysToAdd = ((7 + target - today) % 7) || 7;
        const next = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + daysToAdd
        );

        return formatDate(next, format);
    }

    static async addNDays(date, days, format) {

        if (!date || days <= 0) {
            throw new Error(`Invalid method argument(s) to addNDays(${date}, ${days})`);
        }

        // Clone date to avoid modifying original
        let result = new Date(date.getTime());

        while (days > 0) {
            result.setDate(result.getDate() + 1);
            days--;
        }

        return formatDate(result, format);
    }


    static async lastDateInMonth(format, month) {
        return DateTime.now()
            .plus({ months: month })
            .endOf("month")
            .toFormat(format.replace("M", "L"));
    }


    static async getCurrentDate(dateFormat) {
        
        const date = new Date();

        // build formatting config similar to SimpleDateFormat
        const options = {};
        if (dateFormat.includes(DateFormats.YYYY)) options.year = "numeric";
        if (dateFormat.includes(DateFormats.MM)) options.month = "2-digit";
        if (dateFormat.includes(DateFormats.DD)) options.day = "2-digit";

        let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

        // preserve separator based on input format
        if (dateFormat.includes("-")) {
            formattedDate = formattedDate.replace(/\//g, "-");
        }

        return formattedDate;
    }


}

export default DateFunctions;