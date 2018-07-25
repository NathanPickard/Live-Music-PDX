import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { ArtistService } from '../artists/artist.service';
import { Artist } from '../artists/artist.model';


@Injectable()
export class SearchArtistService {

  constructor(private httpClient: HttpClient, private artistService: ArtistService) { }


  getArtists() {
    this.httpClient.get<Artist[]>('http', {
      observe: 'body',
      responseType: 'json'
    })
      .subscribe(
        (artists: Artist[]) => {
          this.artistService.setArtists(artists);
        }
      )
  }
}