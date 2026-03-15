import { Pipe, PipeTransform } from '@angular/core';

/**
 * Tablo satırlarında tüm sütunlarda metin araması yapar.
 * Kullanım: [rows]="liste | tableFilter:tableSearchTerm"
 */
@Pipe({
  name: 'tableFilter',
  pure: true
})
export class TableFilterPipe implements PipeTransform {

  private static readonly BOOLEAN_SEARCH_MAP: Record<string, string> = {
    true: 'true 1 aktif evet yes',
    false: 'false 0 pasif hayır no'
  };

  private static readonly ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;

  /** Tarihi nokta ile gg.aa.yyyy formatında döndürür */
  private static formatDateDots(date: Date): string {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  }

  /** Arama için metni normalize eder (küçük harf + Türkçe karakterleri tek forma) */
  private static normalizeForSearch(s: string): string {
    const lower = s.toLocaleLowerCase('tr-TR');
    return lower
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c');
  }

  transform<T extends object>(rows: T[] | null | undefined, searchTerm: string): T[] {
    if (!rows || !Array.isArray(rows)) {
      return [];
    }
    const term = (searchTerm || '').trim();
    if (!term) {
      return rows;
    }
    const termNorm = TableFilterPipe.normalizeForSearch(term);
    return rows.filter(row => this.rowMatches(row, termNorm));
  }

  private rowMatches(row: object, termNorm: string): boolean {
    try {
      const text = this.getAllValuesAsString(row);
      const textNorm = TableFilterPipe.normalizeForSearch(text);
      return textNorm.indexOf(termNorm) !== -1;
    } catch {
      return false;
    }
  }

  private getAllValuesAsString(obj: object): string {
    const parts: string[] = [];
    this.collectValues(obj, parts);
    return parts.join(' ');
  }

  private collectValues(value: unknown, parts: string[]): void {
    if (value === null || value === undefined) return;
    if (typeof value === 'boolean') {
      parts.push(String(value));
      parts.push(TableFilterPipe.BOOLEAN_SEARCH_MAP[String(value)] || '');
      return;
    }
    if (typeof value === 'number') {
      parts.push(String(value));
      return;
    }
    if (value instanceof Date) {
      parts.push(value.toISOString());
      parts.push(TableFilterPipe.formatDateDots(value));
      return;
    }
    if (typeof value === 'string') {
      parts.push(value);
      if (TableFilterPipe.ISO_DATE_REGEX.test(value.trim())) {
        try {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            parts.push(TableFilterPipe.formatDateDots(date));
          }
        } catch {
          // ignore parse errors
        }
      }
      return;
    }
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        value.forEach(item => this.collectValues(item, parts));
        return;
      }
      const record = value as Record<string, unknown>;
      Object.keys(record).forEach(key => this.collectValues(record[key], parts));
      return;
    }
    parts.push(String(value));
  }
}
