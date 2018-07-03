import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Artist } from './artist.model';

@Injectable()
export class ArtistService {
  artistsChanged = new Subject<Artist[]>();

  private artists: Artist[] = [
    new Artist(
      'ZZ Top'
    )
  ];

  setArtists(artists: Artist[]) {
    this.artists = artists;
    this.artistsChanged.next(this.artists.slice());
  }

  getArtists() {
    return this.artists.slice();
  }

  getArtist(index: number) {
    return this.artists[index];
  }

  addArtist(artist: Artist) {
    this.artists.push(artist);
    this.artistsChanged.next(this.artists.slice());
  }

  updateArtist(index: number, newArtist: Artist) {
    this.artists[index] = newArtist;
    this.artistsChanged.next(this.artists.slice());
  }

  deleteArtist(index: number) {
    this.artists.splice(index, 1);
    this.artistsChanged.next(this.artists.slice());
  }

}
