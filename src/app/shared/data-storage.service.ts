import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { ArtistService } from "../artists/artist.service";
import { VenueService } from "../venues/venue.service";

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private artistService: ArtistService, private venueService: VenueService) { }

  storeArtists() {
    return this.http.put('https://live-music-pdx.firebaseio.com/artists.json', this.artistService.getArtists());

  }

  storeVenues() {
    return this.http.put('https://live-music-pdx.firebaseio.com/venues.json', this.venueService.getVenues);
  }

}