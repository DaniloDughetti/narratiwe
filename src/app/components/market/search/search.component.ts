import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Search } from "../../../models/search";
import { User } from "../../../models/user";
import { CountryService } from "../../../services/country.service";
import { StoryService } from "../../../services/story.service";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private search: Search;
  private isSearchAdvanced: boolean = false;
  private showedMore: boolean = false;
  private languageList: string[];
  private selectedLanguage: string;
  private user: User;
  private selectedKind: string;
  private kindList: any;

  constructor(private dataService: DataService,
    private countryService: CountryService,
    private storyService: StoryService) { }

  ngOnInit() {
    this.initSearch();
  }

  private initSearch() {
    try {
      this.user = this.dataService.user;
      this.search = new Search();
      this.languageList = this.countryService.getLanguageNameList();
      this.onLanguageChanged(this.selectedLanguage);
      this.kindList = this.storyService.getKindList(this.dataService.user.systemLanguage);
      this.selectedKind = 'kind-0';
      this.selectedLanguage = 'None';
      this.search.language = this.selectedLanguage;
      this.search.kind = this.selectedKind;
    }
    catch (e) {
      this.dataService.manageError(e.message, "search.component");
    }
  }

  private onLanguageChanged(language) {
    this.selectedLanguage = language;
    this.search.language = this.selectedLanguage;
  }

  private searchClicked() {
    try {
      if (!this.search.isAdvanced && this.search.title == '') {
        this.dataService.openCustomSnackBar('Title cannot be empty', 'info');
      } else {
        if (this.isSearchAdvancedAndNoParamsSelected()){
          this.dataService.openCustomSnackBar('Select a language or a kind', 'info');
        }
        else {
          this.dataService.setPwSearch(this.search);
          this.dataService.navigate("/home/market/search-result");
        }
      }
    } catch (e) {
      this.dataService.manageError(e.message, "search.component");
    }
  }

  private isSearchAdvancedAndNoParamsSelected() {
    return this.search.isAdvanced && this.selectedLanguage == 'None' && this.selectedKind == 'kind-0';
  }

  private onKindChanged(kind) {
    this.selectedKind = kind;
    this.search.kind = this.selectedKind;
  }

  private showMoreStories() {
    this.showMore();
  }

  private showLessStories() {
    this.showMore();
  }

  private showMore() {
    this.isSearchAdvanced = !this.isSearchAdvanced;
    this.search.isAdvanced = this.isSearchAdvanced;
    this.showedMore = !this.showedMore;
  }

}
