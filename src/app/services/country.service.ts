import { Injectable, Inject } from '@angular/core';
import { Countries, ICountry, IOfficialCommon, Languages, ILanguage } from 'countries-data';
import * as _ from 'lodash';
import { COUNTRIES_DATA, LANGUAGES_DATA } from './tokens/countries.tokens';

@Injectable()
export class CountryService {

  constructor( @Inject(COUNTRIES_DATA) private _countriesData: Countries,
    @Inject(LANGUAGES_DATA) private _languagesData: Languages) { }

  public getCountryNativeName(a2: string): string {
    const values: IOfficialCommon[] = _.values(this.getCountryObjByA2(a2).name.native);
    if (values.length > 0) {
      return values[0].common;
    }
    return '';
  }

  public getCountryCommonName(a2: string): string {
    return this.getCountryObjByA2(a2).name.common;
  }

  public getCapital(a2: string): string {
    return this.getCountryObjByA2(a2).capital;
  }

  public getSubRegion(a2: string): string {
    return this.getCountryObjByA2(a2).geo.subregion;
  }

  public getPopulationCount(a2: string): number {
    return this.getCountryObjByA2(a2).population.count;
  }

  public getWikiSuffix(a2: string): string {
    return this.getCountryObjByA2(a2).wikiLink;
  }

  public getCountriesA2s(): string[] {
    return _.keys(this._countriesData).sort();
  }

  public getCountriesNameList(): string[] {
    let list: string[] = this.getCountriesA2s();
    let nameList: string[] = [];
    for (let country of list) {
      nameList.push(this._countriesData[country].name.common);
    }
    return nameList;

  }

  public getLanguageNameList(): string[] {
    let list: string[] = this.getLanguagesA2s();
    let nameList: string[] = [];
    nameList.push("None");
    for (let language of list) {
      nameList.push(this._languagesData[language].full);
    }
    return nameList;
  }
  public getLanguageNameListAll(): string[] {
    let list: string[] = this.getLanguagesA2s();
    let nameList: string[] = [];
    nameList.push("All");
    for (let language of list) {
      nameList.push(this._languagesData[language].full);
    }
    return nameList;
  }

  public getCountryObjByA2(a2: string): ICountry {
    return this._countriesData[a2.toUpperCase()];
  }

  public getLanguagesA2s(): string[] {
    return _.keys(this._languagesData).sort();
  }

  public getLanguagesObjByA2(a2: string): ILanguage {
    return this._languagesData[a2.toUpperCase()];
  }

  public getLanguage(): Languages {
    return this._languagesData;
  }

  public getLanguages(): ILanguage[] {
    let list: ILanguage[] = [];
    for (let l of _.keys(this._languagesData).sort()) {
      list.push(this._languagesData[l]);
    }
    return list;
  }

  public getLocalLanguage(): string {
    var userLang = navigator.language;
    return this.convertSupportedLanguage(userLang);
  }

  private convertSupportedLanguage(code: String): string {
    switch (code) {
      case 'it-IT':
        return 'Italian';
      case 'fr-CA':
        return 'French';
      case 'es-ES':
        return 'Spanish';
      case 'de-DE':
        return 'Deutsch'
      default:
        return 'en-US'
    }
  }

  public getSupportedSystemLanguage(): string[] {

    return [
      'Italian',
      'English',
      'Deutsch',
      'French',
      'Spanish'
    ];
  }


}
