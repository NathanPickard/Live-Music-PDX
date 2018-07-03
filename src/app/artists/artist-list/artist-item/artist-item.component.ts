import { Component, OnInit, Input } from '@angular/core';

import { Artist } from '../../artist.model';

@Component({
  selector: 'app-artist-item',
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.css']
})

export class ArtistItemComponent {
  @Input() artist: Artist;
  @Input() index: number;

  ngOnInit() { }
}