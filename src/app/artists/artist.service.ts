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

}
