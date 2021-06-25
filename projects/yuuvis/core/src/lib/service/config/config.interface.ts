/**
 * Interface for the applications main config file
 * @ignore
 */
export interface YuvConfig {
  core: {
    apiBase: {
      core: string;
      'api-web': string;
    };
    languages: YuvConfigLanguages[];
  };
}
/**
 * interface providing localization of application
 */
export interface YuvConfigLanguages {
  iso: string;
  label: string;
  dir?: Direction;
  fallback?: boolean;
}

export enum Direction {
  LTR = 'ltr',
  RTL = 'rtl'
}
