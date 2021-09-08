import { Component, Input, OnInit } from '@angular/core';

import { Artist } from '../../artist.model';

@Component({
  selector: 'app-artist-item',
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.scss']
})

export class ArtistItemComponent implements OnInit {
  @Input() artist: Artist;
  @Input() index: number;

  ngOnInit() { }
}