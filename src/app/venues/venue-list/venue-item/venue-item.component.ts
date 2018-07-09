import { Component, OnInit, Input } from '@angular/core';

import { Venue } from '../../venue.model';

@Component({
  selector: 'app-venue-item',
  templateUrl: './venue-item.component.html',
  styleUrls: ['./venue-item.component.css']
})

export class VenueItemComponent {
  @Input() venue: Venue;
  @Input() index: number;

  ngOnInit() { }
}