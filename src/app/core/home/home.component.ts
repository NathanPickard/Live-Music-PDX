import { Component, OnInit, ViewChild } from '@angular/core';
// import { trigger, state, transition, style, animate } from '@angular/animations';
import { fade } from '../../animations';
import { MatSort, MatTableDataSource, MatTable, PageEvent } from '@angular/material';

import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:
    // [
    //   trigger('fade', [

    //     state('void', style({ opacity: 0 })),

    //     transition(':enter, :leave', [
    //       animate(1000)
    //     ])
    //   ])
    // ]
    [fade]
})

export class HomeComponent implements OnInit {

  foundEvents: any[];
  foundArtists: any[];
  eventsFound: boolean = false;
  type: any[];

  displayedColumns: string[] = ['date', 'displayName', 'uri', 'datetime'];

  @ViewChild(MatSort) sort: MatSort;

  pageEvent: PageEvent;
  dataSource: any;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getPdxEvents();

    this.getPdxEvents()
      data => {
        this.dataSource.data = data;
      }
  }

  handleSuccess(data) {
    this.eventsFound = true;
    this.foundEvents = data.resultsPage.results.event;
    this.dataSource = this.foundEvents;
    // this.foundArtists = data.resultsPage.results.event.performance.artist;
    // console.log(this.foundArtists);
    console.log(this.foundEvents);
    console.log(data.resultsPage.results);
  }

  handleError(error) {
    console.log(error);
  }

  getPdxEvents() {
    return this.searchService.getPdxEvents().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );
  }

}