import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Body, BodyResponse, Filter, Order } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolarSystemService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = environment.apiUrl;

  findAll(filter: Filter): Observable<BodyResponse> {
    const {
      currentPage = 1,
      limit = 5,
      sortBy = 'englishName',
      order = Order.Asc,
      query = '',
    } = filter;

    const filters = ['isPlanet,eq,true', `${sortBy},cs,${query}`];

    let params = new HttpParams()
      .set('order', `${sortBy},${order}`)
      .set('page', `${currentPage},${limit}`);

    filters.forEach(filter => {
      params = params.append('filter[]', filter);
    });

    return this.#http.get<BodyResponse>(`${this.#apiUrl}/bodies`, { params });
  }

  findOne(id: string): Observable<Body> {
    return this.#http.get<Body>(`${this.#apiUrl}/bodies/${id}`);
  }
}
