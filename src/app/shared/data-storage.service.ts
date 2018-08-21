import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Artist } from "../artists/artist.model";
import { Venue } from "../venues/venue.model";
import { ArtistService } from "../artists/artist.service";
import { AuthService } from "../auth/auth.service";
import { VenueService } from "../venues/venue.service";

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
    private artistService: ArtistService,
    private venueService: VenueService,
    private authService: AuthService) { }

  storeArtists() {
    const token = this.authService.getToken();

    return this.http.put('https://live-music-pdx.firebaseio.com/artists.json?auth=' + token, this.artistService.getArtists());
  }

  storeVenues() {
    const token = this.authService.getToken();

    return this.http.put('https://live-music-pdx.firebaseio.com/venues.json?auth=' + token, this.venueService.getVenues());
  }

  getArtists() {
    const token = this.authService.getToken();

    this.http.get('https://live-music-pdx.firebaseio.com/artists.json?auth=' + token)
      .map(
        (response: Response) => {
          const artists: Artist[] = response.json();
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

    this.http.get('https://live-music-pdx.firebaseio.com/venues.json?auth=' + token)
      .map(
        (response: Response) => {
          const venues: Venue[] = response.json();
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