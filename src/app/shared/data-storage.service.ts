import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { ArtistService } from "../artists/artist.service";
import { VenueService } from "../venues/venue.service";
import { Artist } from "../artists/artist.model";
import { Venue } from "../venues/venue.model";

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private artistService: ArtistService, private venueService: VenueService) { }

  storeArtists() {
    return this.http.put('https://live-music-pdx.firebaseio.com/artists.json', this.artistService.getArtists());

  }

  storeVenues() {
    return this.http.put('https://live-music-pdx.firebaseio.com/venues.json', this.venueService.getVenues());
  }

  getArtists() {
    this.http.get('https://live-music-pdx.firebaseio.com/artists.json')
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
    this.http.get('https://live-music-pdx.firebaseio.com/venues.json')
      .subscribe(
        (response: Response) => {
          const venues: Venue[] = response.json();
          this.venueService.setVenues(venues);
        }
      );
  }

}