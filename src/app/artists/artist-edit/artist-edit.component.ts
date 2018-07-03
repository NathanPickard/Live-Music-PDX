import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})

export class ArtistEditComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() { }
}