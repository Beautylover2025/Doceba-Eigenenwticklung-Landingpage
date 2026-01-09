import { format, startOfDay, endOfDay, subDays } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

const TIMEZONE = 'Europe/Berlin';

/**
 * Convert a date to German timezone
 */
export function getGermanDate(date: Date = new Date()): Date {
    return toZonedTime(date, TIMEZONE);
}

/**
 * Get start of today in German timezone (ISO string for Supabase)
 */
export function getStartOfToday(): string {
    const now = getGermanDate();
    const start = startOfDay(now);
    return fromZonedTime(start, TIMEZONE).toISOString();
}

/**
 * Get end of today in German timezone (ISO string for Supabase)
 */
export function getEndOfToday(): string {
    const now = getGermanDate();
    const end = endOfDay(now);
    return fromZonedTime(end, TIMEZONE).toISOString();
}

/**
 * Get start of yesterday in German timezone
 */
export function getStartOfYesterday(): string {
    const now = getGermanDate();
    const yesterday = subDays(now, 1);
    const start = startOfDay(yesterday);
    return fromZonedTime(start, TIMEZONE).toISOString();
}

/**
 * Get end of yesterday in German timezone
 */
export function getEndOfYesterday(): string {
    const now = getGermanDate();
    const yesterday = subDays(now, 1);
    const end = endOfDay(yesterday);
    return fromZonedTime(end, TIMEZONE).toISOString();
}

/**
 * Format a date in German timezone
 */
export function formatGermanDate(date: Date, formatStr: string = 'dd.MM.yyyy HH:mm'): string {
    const germanDate = getGermanDate(date);
    return format(germanDate, formatStr);
}
