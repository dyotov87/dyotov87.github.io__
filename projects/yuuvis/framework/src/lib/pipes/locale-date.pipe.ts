import { DatePipe, FormatWidth, getLocaleDateFormat, getLocaleDateTimeFormat, getLocaleTimeFormat } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@yuuvis/core';

/**
 * This pipe transforms its input (supposed to be a date) into a more human readable format like for example 'dd.MM.yyyy'
 * @example
 *  <div>{{ creationDate | localeDate: 'shortDate' }}</div>
 */
@Pipe({
  name: 'localeDate',
  pure: false
})
export class LocaleDatePipe extends DatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {
    super(translate.currentLang);
  }

  get lang() {
    return this.translate.currentLang;
  }

  transform(value: any, format: string = '', timezone?: string, locale?: string): string | null | any {
    value = Array.isArray(value) ? value[0] : value;
    if (format === 'eoNiceShort') {
      const diff = (new Date(value).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 1000 / 3600 / 24;
      format = diff === 0 ? 'eoShortTime' : diff > -7 && diff < 0 ? 'eoShortDayTime' : format;
    }
    return super.transform(value, this.format(format || 'eoShort'), timezone, locale || this.lang);
  }

  parse(value: string, format: string = 'yyyy-MM-dd') {
    // bug: angular DatePipe cannot format pattern where day is before month (so I am gonna flip values & hope it works for all languages)
    const dd = format.indexOf('dd');
    const MM = format.indexOf('MM');
    const YYYY = format.indexOf('yyyy');
    const HH = format.toUpperCase().indexOf('HH');
    return (
      value && new Date(`${value.substring(YYYY, YYYY + 4)}/${value.substring(MM, MM + 2)}/${value.substring(dd, dd + 2)} ${HH > 0 ? value.substring(HH) : ''}`)
    );
  }

  format(format?: string) {
    let formatValue = '';
    switch (format) {
      case 'eoNiceShort':
      case 'eoShortDate':
        formatValue = getLocaleDateFormat(this.lang, FormatWidth.Short).replace(/[d]+/, 'dd').replace(/[M]+/, 'MM').replace(/[y]+/, 'yyyy');
        break;
      case 'eoShortDay':
        formatValue = 'EE';
        break;
      case 'eoShortTime':
        formatValue = getLocaleTimeFormat(this.lang, FormatWidth.Short).replace(/[h]+/, 'hh').replace(/[H]+/, 'HH').replace(/[m]+/, 'mm').replace(/[a]+/, 'aa');
        break;
      case 'eoShort':
        formatValue = getLocaleDateTimeFormat(this.lang, FormatWidth.Short)
          .replace('{0}', this.format('eoShortTime'))
          .replace('{1}', this.format('eoShortDate'));
        break;
      case 'eoShortDayTime':
        formatValue = getLocaleDateTimeFormat(this.lang, FormatWidth.Short)
          .replace(',', '')
          .replace('{0}', this.format('eoShortTime'))
          .replace('{1}', this.format('eoShortDay'));
        break;
    }

    return formatValue || format;
  }
}
