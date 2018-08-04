import { Component } from '@angular/core';

import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  foundEvents: any[];
  eventsFound: boolean = false;

  handleSuccess(data) {
    this.eventsFound = true;
    this.foundEvents = data.resultsPage.results.event;
    console.log(data.resultsPage.results);
  }

  handleError(error) {
    console.log(error);
  }

  constructor(private searchService: SearchService) { }

  getPdxEvents() {
    return this.searchService.getPdxEvents().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );
  }

}