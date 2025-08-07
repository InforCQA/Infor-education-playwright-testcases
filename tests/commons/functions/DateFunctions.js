import BaseClass from "../../testBase/BaseClass";
import { format as formatDate } from 'date-fns';

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
}

export default DateFunctions;