import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class AutocompleteService {
  constructor(private http: HttpClient) { }

  search(query: string): Observable<any> {
    const url = '';
    return this.http
      .get<any>(url, {
        observe: 'response',
        params: {
          q: query
        }
      })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }
}
