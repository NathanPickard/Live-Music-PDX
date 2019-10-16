/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { fade } from '../../animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource, MatTable, PageEvent, MatPaginator, MatDatepickerInputEvent } from '@angular/material';
import { merge, Observable, of as oberservableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, debounceTime } from 'rxjs/operators';

import { SearchService } from '../../shared/search.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fade]
})
export class HomeComponent implements OnInit {

  public autoCompletentrol = new FormControl();

  @ViewChild('gmap', { static: true }) gmapElement: any;
  map: google.maps.Map;

  venueLat: any;
  venueLng: any;

  datePicked: any;

  mapFound: boolean = false;

  foundEvents: any[];
  performanceArray: any[];
  foundArtists: any[];
  eventsFound: boolean = false;
  type: any[];

  upcomingArtist: any[];
  upcomingPerformance: any;

  foundPopularEvents: any[];
  mostPopular: any;

  person: any;

  searchQuery: string;

  displayedColumns: string[] = ['date', 'displayName', 'venue', 'uri', 'datetime'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  pageEvent: PageEvent;
  dataSource: any;
  searchDataSource: any;

  searchEventForm: FormGroup;
  searchEventNotFound = false;
  searchEventsFound = false;
  foundSearchEvents: any[];

  searchDateForm: FormGroup;

  private API_KEY: string = environment.SONGKICK_API_KEY;
  private API_URL: string = environment.SONGKICK_API_URL;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getPdxEvents();

    this.getPopularPdxEvents();

    var mapProp = {
      center: new google.maps.LatLng(45.5212, -122.664),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.searchEventForm = new FormGroup({
      'searchQuery': new FormControl(null)
    });

    this.searchDateForm = new FormGroup({
      // datePicked: new FormControl(null)
      searchDate: new FormControl(null)
    });

    // this.datePicked = new FormControl(new Date());

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

    for (let i = 0; i < data.resultsPage.results.event.length; i++) {
      // console.log(data.resultsPage.results.event[i].venue);

      // this.map.setCenter(new google.maps.LatLng(data.resultsPage.results.event[i].venue.lat, data.resultsPage.results.event[i].venue.lng));

      let location = new google.maps.LatLng(data.resultsPage.results.event[i].venue.lat, data.resultsPage.results.event[i].venue.lng);

      let eventName = (data.resultsPage.results.event[i].displayName);

      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: eventName,
      });
    }
    // for (i = 0; i < ;)
    // this.upcomingArtist = this.foundEvents[0].performance;
    // this.upcomingPerformance = this.foundEvents;
    // this.performanceArray = data.resultsPage.results.event.location;
    // this.foundArtists = data.resultsPage.results.event.performance.artist;
    // console.log(this.foundArtists);
    console.log(this.foundEvents);
    // console.log(this.upcomingPerformance);
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

  handlePopularEventsSuccess(data) {
    this.foundPopularEvents = data.resultsPage.results.event;
    console.log(this.foundPopularEvents);

    let mostPopular = this.foundPopularEvents;

    // mostPopular.sort((a, b) => 0 - (a > b ? 1 : -1));

    // Sorting events by popularity
    mostPopular.sort((a, b) => 0 - (a.popularity > b.popularity ? 1 : -1));

    mostPopular.length = 5;
    // mostPopular.sort((a, b) => parseFloat(a.popularity) - parseFloat(b.popularity));

    console.log(mostPopular);
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

  getPopularPdxEvents() {
    return this.searchService.getPopularPdxEvents().subscribe(
      data => this.handlePopularEventsSuccess(data),
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

  searchDateEvents() {
    // const query = this.searchDateForm.value.datePicked;
    console.log(this.searchDateForm);

    // formatDate(query, 'yyyy', LOCALE_ID);
    // console.log(query);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }
}


// export class HomePagePagination {
//   constructor(private http: HttpClient) { }

  // today: any;
  // weekDate: any;
  // dayDate: any;
  // monthDate: any;
  // yearDate: any;

  // today = new Date();
  // dayDate = this.today.getDate();
  // weekDate = this.dayDate + 7;
  // monthDate = this.today.getMonth() + 1;
  // yearDate = this.today.getFullYear();

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
// }
