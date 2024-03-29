import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, FormArray, Validators } from '@angular/forms';

import { VenueService } from '../venue.service';

@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.scss']
})

export class VenueEditComponent implements OnInit {
  id: number;
  editMode = false;
  venueForm: UntypedFormGroup;

  constructor(private venueService: VenueService,
    private route: ActivatedRoute,
    private router: Router) { }

  private initForm() {
    let venueName = '';
    let venueAddress = '';
    let venueDescription = '';

    if (this.editMode) {
      const venue = this.venueService.getVenue(this.id);
      venueName = venue.name;
      venueAddress = venue.address;
      venueDescription = venue.description;
    }

    this.venueForm = new UntypedFormGroup({
      'name': new UntypedFormControl(venueName, Validators.required),
      'address': new UntypedFormControl(venueAddress, Validators.required),
      'description': new UntypedFormControl(venueDescription, Validators.required),
    });
  }
  
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        });
  }

  onSubmit() {
    if (this.editMode) {
      this.venueService.updateVenue(this.id, this.venueForm.value);
    } else {
      this.venueService.addVenue(this.venueForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
