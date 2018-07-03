import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Artist } from '../artist.model';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})

export class ArtistEditComponent implements OnInit {
  id: number;
  editMode = false;
  artistForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    const newArtist = new Artist(
      this.artistForm.value['name'])
  }

  private initForm() {
    let artistName = '';
  }
}