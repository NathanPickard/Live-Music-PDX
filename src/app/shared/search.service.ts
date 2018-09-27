import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ArtistService } from '../artists/artist.service';
import { Artist } from '../artists/artist.model';
import { Venue } from '../venues/venue.model';

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient,
    private http: Http,
    private artistService: ArtistService) { }

  private artist: string;
  private query: string;
  private API_KEY: string = environment.SONGKICK_API_KEY;
  private API_URL: string = environment.SONGKICK_API_URL;
  private ARTIST_URL: string = this.API_URL + 'search/artists.json?apikey=' + this.API_KEY + '&query=';
  private VENUE_URL: string = this.API_URL + 'search/venues.json?query=';

  artistsResults: any;

  selectedArtist: Artist;

  artistId: number;
  venueId: number;

  today: any;
  weekDate: any;
  dayDate: any;
  monthDate: any;
  yearDate: any;


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

    return this.http.get(this.ARTIST_URL + query)
      .map(res => res.json());

    // return this.httpClient.get<Artist[]>(this.ARTIST_URL + query);

  }

  getVenues(query) {
    return this.http.get(this.VENUE_URL + query + '&apikey=' + this.API_KEY)
      .map(res => res.json());

    // return this.httpClient.get<Venue[]>(this.VENUE_URL + query + '&apikey=' + this.API_KEY);
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

    if (this.monthDate < 10) {
      this.monthDate = '0' + this.monthDate;
    }

    this.today = this.yearDate + '-' + this.monthDate + '-' + this.dayDate;
    this.weekDate = this.yearDate + '-' + this.monthDate + '-' + (this.weekDate);

    // console.log(this.today);
    // console.log(this.weekDate);

    return this.http.get(this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY +
      '&min_date=' + this.today + '&max_date=' + this.weekDate + '&per_page=25')
      .map(res => res.json());


    // return this.httpClient.get<any>(this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY +
    //   '&min_date=' + this.today + '&max_date=' + this.weekDate + '&per_page=25');
  }

  getSelectedArtistEvents(artistId) {
    // this.getArtists(artist);

    return this.http.get('https://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=' + this.API_KEY)
      .map(res => res.json());
  }

  getSelectedVenueEvents(venueId) {

    return this.http.get('https://api.songkick.com/api/3.0/venues/' + venueId + '/calendar.json?apikey=' + this.API_KEY)
      .map(res => res.json());
  }
}