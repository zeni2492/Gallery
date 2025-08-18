import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";

export function formatter(
    date: string | Date,
    formatStr?: string,
    withTime: boolean = false
): string {
    // Если дата — строка, парсим её
    const dateObj = typeof date === 'string'
        ? parse(date, withTime ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy', new Date())
        : date;
    // Определяем формат:
    // - Если передан `formatStr`, используем его
    const finalFormat = formatStr || (withTime ? 'dd.MM.yyyy в HH:mm' : 'd MMM');

    return format(dateObj, finalFormat, { locale: ru });
}