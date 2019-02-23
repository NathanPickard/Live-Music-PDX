import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EventsComponent } from './events.component';
import { EventStartComponent } from './event-start/event-start.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventStartComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})

export class EventsModule { }
