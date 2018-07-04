import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})

export class ArtistEditComponent implements OnInit {
  id: number;
  editMode = false;
  artistForm: FormGroup;

  constructor(private artistService: ArtistService, private route: ActivatedRoute, private router: Router) { }

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
    if (this.editMode) {
      this.artistService.updateArtist(this.id, this.artistForm.value);
    } else {
      this.artistService.addArtist(this.artistForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let artistName = '';

    if (this.editMode) {
      const artist = this.artistService.getArtist(this.id);
      artistName = artist.name;
    }

    this.artistForm = new FormGroup({
      'name': new FormControl(artistName, Validators.required)
    });
  }


}