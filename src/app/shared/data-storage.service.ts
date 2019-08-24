import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { Artist } from "../artists/artist.model";
import { Venue } from "../venues/venue.model";
import { ArtistService } from "../artists/artist.service";
import { AuthService } from "../auth/auth.service";
import { VenueService } from "../venues/venue.service";

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
    private artistService: ArtistService,
    private venueService: VenueService,
    private authService: AuthService) { }

  storeArtists() {
    // HttpClient implementation
    const token = this.authService.getToken();

    // return this.http.put('https://live-music-pdx.firebaseio.com/artists.json?auth=' + token, this.artistService.getArtists());

    return this.httpClient.put('https://live-music-pdx.firebaseio.com/artists.json', this.artistService.getArtists(), {
      observe: 'body',
      params: new HttpParams().set('auth', token)
    });

    // const req = new HttpRequest('PUT', 'https://live-music-pdx.firebaseio.com/artists.json', this.artistService.getArtists(), { reportProgress: true })
    // return this.httpClient.request(req);
  }

  storeVenues() {
    const token = this.authService.getToken();

    // return this.http.put('https://live-music-pdx.firebaseio.com/venues.json?auth=' + token, this.venueService.getVenues());
    return this.httpClient.put('https://live-music-pdx.firebaseio.com/venues.json', this.venueService.getVenues(), {
      observe: 'body',
      params: new HttpParams().set('auth', token)
    });
  }

  getArtists() {
    const token = this.authService.getToken();

    // this.http.get('https://live-music-pdx.firebaseio.com/artists.json?auth=' + token)
    //   .map(
    //     (response: Response) => {
    //       const artists: Artist[] = response.json();
    //       for (let artist of artists) {
    //         if (!artist['name']) {
    //           console.log(artist);
    //           artist['name'] = '';
    //         }
    //       }
    //       return artists;
    //     }
    //   )
    //   .subscribe(
    //     (artists: Artist[]) => {
    //       this.artistService.setArtists(artists);
    //     }
    //   );

    // this.httpClient.get<Artist[]>('https://live-music-pdx.firebaseio.com/artists.json?auth=' + token)
    this.httpClient.get<Artist[]>('https://live-music-pdx.firebaseio.com/artists.json', {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().set('auth', token)
    })
      .map(
        (artists) => {
          console.log(artists);
          for (let artist of artists) {
            if (!artist['name']) {
              console.log(artist);
              artist['name'] = '';
            }
          }
          return artists;
        }
      )
      .subscribe(
        (artists: Artist[]) => {
          this.artistService.setArtists(artists);
        }
      );
  }

  getVenues() {
    const token = this.authService.getToken();

    // this.http.get('https://live-music-pdx.firebaseio.com/venues.json?auth=' + token)
    //   .map(
    //     (response: Response) => {
    //       const venues: Venue[] = response.json();
    //       return venues;
    //     }
    //   )
    //   .subscribe(
    //     (venues: Venue[]) => {
    //       this.venueService.setVenues(venues);
    //     }
    //   );

    this.httpClient.get<Venue[]>('https://live-music-pdx.firebaseio.com/venues.json', {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().set('auth', token)
    })
      .map(
        (venues) => {
          return venues;
        }
      )
      .subscribe(
        (venues: Venue[]) => {
          this.venueService.setVenues(venues);
        }
      );
  }

}
