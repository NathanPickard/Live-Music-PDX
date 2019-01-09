import { Component, OnInit, ViewChild } from '@angular/core';
// import { trigger, state, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { fade } from '../../animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource, MatTable, PageEvent, MatPaginator } from '@angular/material';
import { merge, Observable, of as oberservableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { SearchService } from '../../shared/search.service';
// import { merge } from 'rxjs-compat/operator/merge';

import { environment } from '../../../environments/environment';

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
  performanceArray: any[];
  foundArtists: any[];
  eventsFound: boolean = false;
  type: any[];

  foundSearchEvents: any[];
  searchEventsFound: boolean = false;

  searchQuery: string;

  displayedColumns: string[] = ['date', 'displayName', 'venue', 'uri', 'datetime'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageEvent: PageEvent;
  dataSource: any;
  searchDataSource: any;

  searchEventForm: FormGroup;
  searchEventNotFound: boolean = false;
  // dataSource: MatTableDataSource<any>;


  private API_KEY: string = environment.SONGKICK_API_KEY;
  private API_URL: string = environment.SONGKICK_API_URL;


  constructor(private searchService: SearchService) { }

  ngOnInit() {

    this.getPdxEvents();

    this.searchEventForm = new FormGroup({
      'searchQuery': new FormControl(null)
    });

    this.searchEventForm = new FormGroup({
      'searchQuery': new FormControl(null)
    })

    // this.getPdxEvents()
    //   data => {
    //     this.dataSource.data = data;
    //   }

    // this.dataSource.sort = this.sort;

    // merge(this.sort.sortChange)
    // .pipe(
    //   startWith({}),
    //   switchMap(() => {
    //     return this.handleSuccess(this.sort.active);
    //   })
    // )
  }

  handleSuccess(data) {
    this.eventsFound = true;
    this.foundEvents = data.resultsPage.results.event;
    this.dataSource = this.foundEvents;
    // this.performanceArray = data.resultsPage.results.event.location;
    // this.foundArtists = data.resultsPage.results.event.performance.artist;
    // console.log(this.foundArtists);
    console.log(this.foundEvents);
    // console.log(this.performanceArray);
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

  handleError(error) {
    console.log(error);
  }

  getPdxEvents() {
    return this.searchService.getPdxEvents().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );
  }

  searchEvents() {
    const query = this.searchEventForm.value.searchQuery;
    return this.searchService.getSearchEvents(query).subscribe(
      data => this.handleSearchEventsSuccess(data),
      error => this.handleError(error)
    );
  }

}


export class HomePagePagination {
  constructor(private http: HttpClient) { }

  // today: any;
  // weekDate: any;
  // dayDate: any;
  // monthDate: any;
  // yearDate: any;


today = new Date();
dayDate = this.today.getDate();
weekDate = this.dayDate + 7;
monthDate = this.today.getMonth() + 1;
yearDate = this.today.getFullYear();

// if (this.dayDate < 10) {
//   this.dayDate = '0' + this.dayDate;
// }

// if (this.weekDate < 10) {
//   this.weekDate = '0' + this.weekDate;
// }

// if (this.monthDate < 10) {
//   this.monthDate = '0' + this.monthDate;
// }

// this.today = this.yearDate + '-' + this.monthDate + '-' + this.dayDate;
// this.weekDate = this.yearDate + '-' + this.monthDate + '-' + (this.weekDate);


// return this.http.get(this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY +
//   '&min_date=' + this.today + '&max_date=' + this.weekDate + '&per_page=25')
//   .map(res => res.json());

// getPdxEventsPagination(sort: string, order: string, page: number): Observable < any > {
//   const requestUrl =

//   }
}
