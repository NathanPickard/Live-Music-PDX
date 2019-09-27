import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';

import { EventsComponent } from './events.component';
import { EventStartComponent } from './event-start/event-start.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventStartComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})

export class EventsModule { }
