// import dayjs, { Dayjs } from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import isBetween from 'dayjs/plugin/isBetween';
// import isLeapYear from 'dayjs/plugin/isLeapYear';
// import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
// import timezone from 'dayjs/plugin/timezone';
// import utc from 'dayjs/plugin/utc';
// import weekday from 'dayjs/plugin/weekday';

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.extend(customParseFormat);
// dayjs.extend(isBetween);
// dayjs.extend(isSameOrAfter);
// dayjs.extend(isSameOrBefore);
// dayjs.extend(weekday);
// dayjs.extend(isoWeeksInYear);
// dayjs.extend(isLeapYear);

// export type IDateTime = Dayjs;

// export const dateTime = dayjs;

// dayjs.extend((option, c) => {
//   c.prototype.formatForDatabase = function (): string {
//     return this.utc().format('YYYY-MM-DD HH:mm:ss.SSS');
//   };
//   c.prototype.isTimeBetween = function (
//     start: Dayjs,
//     end: Dayjs,
//     unit: 'hour' | 'minute' | 'second',
//     interval: '()' | '[]' | '[)' | '(]' = '[]',
//   ): boolean {
//     const source = extractTime(this);
//     const _start = extractTime(start);
//     const _end = extractTime(end);
//     return source.isBetween(_start, _end, unit, interval);
//   };
//   c.prototype.isTimeSameOrBefore = function (
//     date: Dayjs,
//     unit: 'hour' | 'minute' | 'second',
//   ): boolean {
//     const source = extractTime(this);
//     const target = extractTime(date);
//     return source.isSameOrBefore(target, unit);
//   };
//   c.prototype.isTimeSameOrAfter = function (
//     date: Dayjs,
//     unit: 'hour' | 'minute' | 'second',
//   ): boolean {
//     const source = extractTime(this);
//     const target = extractTime(date);
//     return source.isSameOrAfter(target, unit);
//   };
//   c.prototype.extractTime = function (tz: string) {
//     return extractTime(this, tz);
//   };
// });

// declare module 'dayjs' {
//   interface Dayjs {
//     formatForDatabase(): string;
//     /**
//      * Check if a given time falls between a start and end time,
//      * with an optional interval specification.
//      *
//      * @param start - The start time
//      * @param end - The end time
//      * @param unit - The time unit ('hour', 'minute', or 'second')
//      * @param interval - The interval specification, optional ('()', '[]', '[)', or '()'), default '[]'
//      * @returns true if the time falls within the specified range, based on the interval specification
//      */
//     isTimeBetween(
//       start: IDateTime,
//       end: IDateTime,
//       unit: 'hour' | 'minute' | 'second',
//       interval?: '()' | '[]' | '[)' | '(]',
//     ): boolean;
//     /**
//      * Checks if the given date is the same as or before the specified unit.
//      *
//      * @param {IDateTime} date - the date to compare
//      * @param {'hour' | 'minute' | 'second'} unit - the time unit to compare
//      * @return {boolean} true if the date is the same as or before the specified unit, false otherwise
//      */
//     isTimeSameOrBefore(
//       date: IDateTime,
//       unit: 'hour' | 'minute' | 'second',
//     ): boolean;

//     /**
//      * Check if the given date is the same or after the specified unit.
//      *
//      * @param {IDateTime} date - the date to compare
//      * @param {'hour' | 'minute' | 'second'} unit - the unit to compare
//      * @return {boolean} true if the date is the same or after the specified unit, false otherwise
//      */
//     isTimeSameOrAfter(
//       date: IDateTime,
//       unit: 'hour' | 'minute' | 'second',
//     ): boolean;

//     /**
//      * Extracts the exact time from the given date and returns a new date object with only the hour, minute, and second.
//      * @returns A new date object with only the hour, minute, and second
//      */
//     extractTime(tz?: string): IDateTime;
//   }
// }

// /**
//  * Extracts the exact time from the given date and returns a new date object with only the hour, minute, and second.
//  * @param date - The original date object
//  * @returns A new date object with only the hour, minute, and second
//  */
// const extractTime = (date: IDateTime, tz?: string): IDateTime => {
//   // Extract hour, minute, and second from the original date
//   const day = date.get('day');
//   const hour = date.get('hour');
//   const minute = date.get('minute');
//   const second = date.get('second');

//   const dateWithTZ = date.tz(tz);
//   const dayWithTZ = dateWithTZ.get('day');

//   const defaultDate = day < dayWithTZ ? '2001-06-04' : '2001-06-05';

//   return dateTime(defaultDate)
//     .set('hour', hour)
//     .set('minute', minute)
//     .set('second', second);
// };

// export function getWeeksInYear(year: number): { start: string; end: string }[] {
//   const firstDayOfYear = dateTime(`${year}-01-01`).weekday(1);

//   const numberOfWeekInYear = dateTime(`${year}-01-01`).isoWeeksInYear();

//   const weeksInYear = [];
//   for (let i = 0; i < numberOfWeekInYear; i++) {
//     const weekStart = firstDayOfYear.add(i, 'week');
//     const weekEnd = weekStart.clone().add(6, 'day');
//     weeksInYear.push({
//       start: weekStart.format('YYYY-MM-DD'),
//       end: weekEnd.format('YYYY-MM-DD'),
//     });
//   }

//   return weeksInYear;
// }
