import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ArtistService } from '../artists/artist.service';
import { Artist } from '../artists/artist.model';

@Injectable()
export class SearchService {

  private query: string;
  private API_KEY: string = environment.SONGKICK_API_KEY;
  private API_URL: string = environment.SONGKICK_API_URL;
  private ARTIST_URL: string = this.API_URL + 'search/artists.json?apikey=' + this.API_KEY + '&query=';
  private VENUE_URL: string = this.API_URL + 'search/venues.json?query=';

  constructor(private httpClient: HttpClient, private http: Http, private artistService: ArtistService) { }


  getArtists(query) {
    // this.httpClient.get<Artist[]>('https://api.songkick.com/api/3.0/search/artists.json?apikey='  + '&query={artist_name}', {
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
  }

  getVenues(query) {
    return this.http.get(this.VENUE_URL + query + '&apikey=' + this.API_KEY)
      .map(res => res.json());
  }

  getPdxEvents() {
    return this.http.get(this.API_URL + 'metro_areas/12283/calendar.json?apikey=' + this.API_KEY)
      .map(res => res.json());
  }
}