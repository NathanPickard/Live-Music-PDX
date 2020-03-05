import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ArtistService } from '../artists/artist.service';
import { Artist } from '../artists/artist.model';
import { Venue } from '../venues/venue.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient,
    private artistService: ArtistService) { }

  private artist: string;
  private query: string;
  private API_KEY: string = environment.SONGKICK_API_KEY;
  private API_URL: string = environment.SONGKICK_API_URL;
  private DEEZER_KEY: string = environment.DEEZER_API_KEY;
  private DEEZER_URL: string = environment.DEEZER_API_URL;
  private ARTIST_URL: string = this.API_URL + 'search/artists.json?apikey=' + this.API_KEY + '&query=';
  private VENUE_URL: string = this.API_URL + 'search/venues.json?query=';

  artistsResults: any;

  selectedArtist: Artist;

  artistId: number;
  venueId: number;

  today: any;
  weekDate: any;
  monthAheadDate: any;
  monthAheadDay: any;
  dayDate: any;
  monthDate: any;
  yearDate: any;

  thirtyDaysAhead: any;
  popularTodayDate: any;

  getArtists(query) {
    // this.httpClient.get<Artist[]>('https://api.songkick.com/api/3.0/search/artists.json?apikey=' + '&query={artist_name}', {
    //   observe: 'body',
    //   responseType: 'json'
    // })
    //   .subscribe(
    //     (artists: Artist[]) => {
    //       this.artistService.setArtists(artists);
    //     }
    //   )

    // return this.http.get(this.ARTIST_URL + query)
    //   .map(res => res.json());

    // return this.httpClient.get<Artist[]>(this.ARTIST_URL + query);
    return this.httpClient.get<any>(this.ARTIST_URL + query);
  }

  searchDeezerArtists(query) {
    // this.searchDeezerUrl
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Mashape-Key': this.DEEZER_KEY,
        'Accept': 'text/plain'
      })
    };
    return this.httpClient.get<any>(this.DEEZER_URL + '/search?q=' + query, httpOptions);
  }

  getSimilarArtists(artistId) {
    // return this.http.get(this.API_URL + 'artists/' + artistId + '/similar_artists.json?apikey=' + this.API_KEY)
    // .map(res => res.json());
    return this.httpClient.get(this.API_URL + 'artists/' + artistId + '/similar_artists.json?apikey=' + this.API_KEY);
  }

  getVenues(query) {
    // return this.http.get(this.VENUE_URL + query + '&apikey=' + this.API_KEY)
    //   .map(res => res.json());
    return this.httpClient.get<Venue[]>(this.VENUE_URL + query + '&apikey=' + this.API_KEY);
  }

  getPdxEvents() {
    this.today = new Date();
    this.dayDate = this.today.getDate();
    this.weekDate = this.dayDate + 7;
    this.monthDate = this.today.getMonth() + 1;
    this.yearDate = this.today.getFullYear();

    if (this.dayDate < 10) {
      this.dayDate = '0' + this.dayDate;
    }

    if (this.weekDate < 10) {
      this.weekDate = '0' + this.weekDate;
    }

    if (this.monthDate < 10) {
      this.monthDate = '0' + this.monthDate;
    }

    this.today = this.yearDate + '-' + this.monthDate + '-' + this.dayDate;
    this.weekDate = this.yearDate + '-' + this.monthDate + '-' + (this.weekDate);

    return this.httpClient.get<any>(this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY +
      '&min_date=' + this.today + '&max_date=' + this.weekDate + '&per_page=25');
  }

  getPopularPdxEvents() {
    this.today = new Date();
    this.dayDate = this.today.getDate();
    this.weekDate = this.dayDate + 7;
    this.monthAheadDate = this.today.getMonth() + 2;
    this.monthAheadDay = this.today.getDate() + 30;
    this.monthDate = this.today.getMonth() + 1;
    this.yearDate = this.today.getFullYear();

    this.thirtyDaysAhead = moment().add(4, 'weeks').format(moment.HTML5_FMT.DATE);

    if (this.dayDate < 10) {
      this.dayDate = '0' + this.dayDate;
    }

    if (this.weekDate < 10) {
      this.weekDate = '0' + this.weekDate;
    }

    if (this.monthDate < 10) {
      this.monthDate = '0' + this.monthDate;
    }

    if (this.monthAheadDate < 10) {
      this.monthAheadDate = '0' + this.monthAheadDate;
    }

    this.today = this.yearDate + '-' + this.monthDate + '-' + this.dayDate;
    this.weekDate = this.yearDate + '-' + this.monthDate + '-' + (this.weekDate);

    this.popularTodayDate = moment().format(moment.HTML5_FMT.DATE);

    // console.log(this.thirtyDaysAhead);
    console.log(this.popularTodayDate);

    // var returnVar = this.http.get(this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY +
    //   '&min_date=' + this.today + '&max_date=' + this.weekDate + '&per_page=8')
    //   .map(res => {
    //     var ret = res.json();
    //     ret.sort((a, b) => a.popularity < b.popularity ? -1 : 1);
    //     return ret;
    //   });
    return this.httpClient.get<any>(this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY +
      '&min_date=' + this.popularTodayDate + '&max_date=' + this.popularTodayDate);
  }

  getPdxEventsPagination(sort: string, order: string, page: number): Observable<any> {
    this.today = new Date();
    this.dayDate = this.today.getDate();
    this.weekDate = this.dayDate + 7;
    this.monthDate = this.today.getMonth() + 1;
    this.yearDate = this.today.getFullYear();

    if (this.dayDate < 10) {
      this.dayDate = '0' + this.dayDate;
    }

    if (this.weekDate < 10) {
      this.weekDate = '0' + this.weekDate;
    }

    if (this.monthDate < 10) {
      this.monthDate = '0' + this.monthDate;
    }

    this.today = this.yearDate + '-' + this.monthDate + '-' + this.dayDate;
    this.weekDate = this.yearDate + '-' + this.monthDate + '-' + (this.weekDate);

    const requestUrl = (this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY +
      '&min_date=' + this.today + '&max_date=' + this.weekDate + '&per_page=25' + '&sort=');

    return this.httpClient.get(requestUrl);

    // return this.httpClient.get<any>(this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY +
    //   '&min_date=' + this.today + '&max_date=' + this.weekDate + '&per_page=25');
  }

  // Homepage event search
  getSearchEvents(query) {
    return this.httpClient.get(this.API_URL + 'events.json?apikey=' + this.API_KEY + '&artist_name=' + query + '&location=sk:12283');
  }

  getDateSelectedEvents(dateQuery) {
    return this.httpClient.get(this.API_URL + 'events.json?apikey=' + this.API_KEY
      + '&location=sk:12283' + '&min_date=' + dateQuery + '&max_date=' + dateQuery);
  }

  requestDataFromVenuesAndArists(query): Observable<any[]> {
    let response1 = this.httpClient.get(this.API_URL + 'events.json?apikey=' + this.API_KEY + '&artist_name=' + query + '&location=sk:12283');
    let response2 = this.httpClient.get(this.API_URL + 'events.json?apikey=' + this.API_KEY + '&artist_name=' + query + '&location=sk:12283');
    return Observable.forkJoin([response1, response2]);
  }

  getSelectedArtistEvents(artistId) {
    // return this.http.get('https://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=' + this.API_KEY)
    //   .map(res => res.json());

    return this.httpClient.get('https://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=' + this.API_KEY);
  }

  getSelectedVenueEvents(venueId) {
    // return this.http.get('https://api.songkick.com/api/3.0/venues/' + venueId + '/calendar.json?apikey=' + this.API_KEY)
    //   .map(res => res.json());

    return this.httpClient.get('https://api.songkick.com/api/3.0/venues/' + venueId + '/calendar.json?apikey=' + this.API_KEY);
  }

  getSelectedVenueWebsite(venueId) {
    return this.httpClient.get('https://api.songkick.com/api/3.0/venues/' + venueId + '/calendar.json?apikey=' + this.API_KEY);
  }

  getVenueListLocation(venue) {
    return this.httpClient.get('https://api.songkick.com/api/3.0/venues/' + venue + '.json?apikey=' + this.API_KEY);
  }
}
