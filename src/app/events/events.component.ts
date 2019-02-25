import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor() { }

  searchEventForm: FormGroup;

  ngOnInit() {
    this.searchEventForm = new FormGroup({
      'searchQuery': new FormControl(null, Validators.required)
    });
  }

  searchEvents() {
  }

}
