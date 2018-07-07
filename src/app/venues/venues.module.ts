import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenuesComponent } from './venues.component';
import { VenuesListComponent } from './venues-list/venues-list.component';

@NgModule({
  declarations: [
    VenuesComponent,
    VenuesListComponent
  ],
  imports: [
    CommonModule,
  ]
})

export class VenuesModule { }