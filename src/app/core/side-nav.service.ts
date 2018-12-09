import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private openNavSource = new Subject();

  openNav$ = this.openNavSource.asObservable();

  openNav = () => this.openNavSource.next();

  constructor() { }
}
