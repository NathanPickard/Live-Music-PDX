import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EventsComponent } from './events.component';
import { EventStartComponent } from './event-start/event-start.component';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [
    EventsComponent,
    EventStartComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    FlexLayoutModule
  ]
})

export class EventsModule { }
