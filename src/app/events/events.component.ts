import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  foundPopularEvents: any[];
  eventsFound = false;
  today: number = Date.now();

  searchEventForm: FormGroup;

  foundSearchEvents: any[];
  searchEventsFound = false;
  searchEventNotFound = false;
  popularEventsNotFound = false;

  displayedColumns: string[] = ['date', 'displayName', 'venue', 'uri', 'datetime'];

  dataSource: any;
  searchDataSource: any;

  ngOnInit() {
    this.searchEventForm = new FormGroup({
      'searchQuery': new FormControl(null)
    });

    this.getPopularPdxEvents();
  }

  searchEvents() {
    const query = this.searchEventForm.value.searchQuery;
    return this.searchService.getSearchEvents(query).subscribe(
      data => this.handleSearchEventsSuccess(data),
      error => this.handleError(error)
    );
  }

  handleSearchEventsSuccess(data) {
    this.searchEventsFound = true;
    this.foundSearchEvents = data.resultsPage.results.event;
    this.searchDataSource = this.foundSearchEvents;
    console.log(this.foundSearchEvents);

    if (this.foundSearchEvents == undefined) {
      this.searchEventNotFound = true;
    }
  }

  getPopularPdxEvents() {
    return this.searchService.getPopularPdxEvents().subscribe(
      data => this.handlePopularEventsSuccess(data),
      error => this.handleError(error)
    );
  }

  handlePopularEventsSuccess(data) {
    this.eventsFound = true;
    this.foundPopularEvents = data.resultsPage.results.event;

    if (this.foundPopularEvents === undefined) {
      this.popularEventsNotFound = true;
    }

    if (this.foundPopularEvents) {

      let mostPopular = this.foundPopularEvents;
      console.log(mostPopular.length);

      // Sorting events by popularity
      mostPopular.sort((a, b) => 0 - (a.popularity > b.popularity ? 1 : -1));

      // mostPopular.length = 5;
      // mostPopular.sort((a, b) => parseFloat(a.popularity) - parseFloat(b.popularity));
      this.dataSource = mostPopular;
      console.log(mostPopular);
    }
  }

  handleError(error) {
    console.log(error);
  }

}
