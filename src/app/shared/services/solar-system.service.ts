import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { BodyResponse, Filter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SolarSystemService {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = environment.apiUrl;

  getPlanets(filter: Filter) {
    const { currentPage, limit, sortBy, order, query } = filter;

    const filters = ['isPlanet,eq,true', `${sortBy},cs,${query}`];

    let params = new HttpParams()
      .set('order', `${sortBy},${order}`)
      .set('page', `${currentPage},${limit}`);

    filters.forEach(filter => {
      params = params.append('filter[]', filter);
    });

    return this.#http.get<BodyResponse>(`${this.#apiUrl}/bodies`, { params });
  }
}
