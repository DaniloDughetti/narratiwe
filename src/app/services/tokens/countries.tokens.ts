import { InjectionToken } from '@angular/core';
import { CountriesData, LanguagesData,
         Countries, Languages } from 'countries-data';

export const COUNTRIES_DATA = new InjectionToken<Countries>('CountriesData');
export const LANGUAGES_DATA = new InjectionToken<Languages>('LanguagesData');

export const TOKENS_PROVIDERS = [
  { provide: COUNTRIES_DATA, useValue: CountriesData },
  { provide: LANGUAGES_DATA, useValue: LanguagesData }
];