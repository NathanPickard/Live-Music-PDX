/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource, MatTable, PageEvent, MatPaginator, MatDatepickerInputEvent } from '@angular/material';
import { merge, Observable, of as oberservableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { fade } from '../../animations';

import { SearchService } from '../../shared/search.service';

import { environment } from '../../../environments/environment';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// import {default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || _moment;
const moment = _moment;

export const MY_FORMAT = {
  parse: {
    dateInput: 'YYYY MMMM DD',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },
  ],
  animations: [fade]
})
export class HomeComponent implements OnInit {

  public autoCompletentrol = new FormControl();

  @ViewChild('gmap', { static: true }) gmapElement: any;
  map: google.maps.Map;

  venueLat: any;
  venueLng: any;

  datePicked: any;

  dateSelected: any;
  yearSelected: any;
  monthSelected: any;
  daySelected: any;

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

  foundDateSelectedEvents: any[];

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

      // searchDate: new FormControl(null)
      searchDate: new FormControl(moment())
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

  handleDateSelectedSuccess(data) {
    this.foundDateSelectedEvents = data;
    console.log(this.foundDateSelectedEvents);
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

    this.yearSelected = this.searchDateForm.value.searchDate._i.year;
    this.monthSelected = this.searchDateForm.value.searchDate._i.month + 1;
    this.daySelected = this.searchDateForm.value.searchDate._i.date;

    if (this.monthSelected < 10) {
      this.monthSelected = '0' + this.monthSelected;
    }
    if (this.daySelected < 10) {
      this.daySelected = '0' + this.daySelected;
    }

    this.dateSelected = this.yearSelected + '-' + this.monthSelected + '-' + this.daySelected;

    const dateQuery = this.dateSelected;
    console.log(dateQuery);

    return this.searchService.getDateSelectedEvents(dateQuery).subscribe(
      data => this.handleDateSelectedSuccess(data),
      error => this.handleError(error)
    );
    // const query = this.searchDateForm.value.datePicked;

    // formatDate(query, 'yyyy', LOCALE_ID);
    // console.log(query);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);

    this.yearSelected = this.searchDateForm.value.searchDate._i.year;
    this.monthSelected = this.searchDateForm.value.searchDate._i.month + 1;
    this.daySelected = this.searchDateForm.value.searchDate._i.date;

    if (this.monthSelected < 10) {
      this.monthSelected = '0' + this.monthSelected;
    }
    if (this.daySelected < 10) {
      this.daySelected = '0' + this.daySelected;
    }

    this.dateSelected = this.yearSelected + '-' + this.monthSelected + '-' + this.daySelected;

    const dateQuery = this.dateSelected;
    console.log(dateQuery);

    return this.searchService.getDateSelectedEvents(dateQuery).subscribe(
      data => this.handleDateSelectedSuccess(data),
      error => this.handleError(error)
    );
  }

}
