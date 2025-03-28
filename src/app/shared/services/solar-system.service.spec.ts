import { TestBed } from '@angular/core/testing';
import { SolarSystemService } from './solar-system.service';
import { HttpParams, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from './../../../environments/environment';
import { generateFakeBody } from '../models/system-solar.mock';
import { BodyResponse, Filter, Order } from '../models';

describe('SolarSystemService', () => {
  let service: SolarSystemService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SolarSystemService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findOne() should return a body', done => {
    const id = '5';
    const mockBody = generateFakeBody({ id });
    const url = `${environment.apiUrl}/bodies/${id}`;

    service.findOne(id).subscribe({
      next: body => {
        expect(body).toEqual(mockBody);
        done();
      },
    });

    const req = httpTesting.expectOne(url);
    req.flush(mockBody);

    expect(req.request.method).toBe('GET');
  });

  it('findAll() should return a body list without query filter applied', done => {
    const mockBodies = [generateFakeBody(), generateFakeBody()];
    const mockBodyResponse: BodyResponse = {
      bodies: mockBodies,
    };
    const filter: Filter = {
      currentPage: 1,
      limit: 2,
      sortBy: 'englishName',
      order: Order.Asc,
      query: '',
    };
    const params = new HttpParams()
      .set('order', `${filter.sortBy},${filter.order}`)
      .set('page', `${filter.currentPage},${filter.limit}`)
      .set('filter[]', 'isPlanet,eq,true');

    const url = `${environment.apiUrl}/bodies?${params.toString()}`;

    service.findAll(filter).subscribe({
      next: response => {
        expect(response.bodies).toEqual(mockBodies);
        done();
      },
    });

    const req = httpTesting.expectOne(url);
    req.flush(mockBodyResponse);

    const reqParams = req.request.params;
    expect(req.request.method).toBe('GET');
    expect(reqParams.get('order')).toBe(params.get('order'));
    expect(reqParams.get('page')).toBe(params.get('page'));
    expect(reqParams.get('filter[]')).toBe(params.get('filter[]'));
  });

  it('findAll() should return a body list with query filter applied', done => {
    const mockBodies = [generateFakeBody(), generateFakeBody()];
    const mockBodyResponse: BodyResponse = {
      bodies: mockBodies,
    };
    const filter: Filter = {
      currentPage: 1,
      limit: 2,
      sortBy: 'englishName',
      order: Order.Asc,
      query: 'earth',
    };
    const params = new HttpParams()
      .set('order', `${filter.sortBy},${filter.order}`)
      .set('page', `${filter.currentPage},${filter.limit}`)
      .set('filter[]', 'isPlanet,eq,true')
      .append('filter[]', `${filter.sortBy},cs,${filter.query}`);

    const url = `${environment.apiUrl}/bodies?${params.toString()}`;

    service.findAll(filter).subscribe({
      next: response => {
        expect(response.bodies).toEqual(mockBodies);
        done();
      },
    });

    const req = httpTesting.expectOne(url);
    req.flush(mockBodyResponse);

    const reqParams = req.request.params;
    expect(req.request.method).toBe('GET');
    expect(reqParams.get('order')).toBe(params.get('order'));
    expect(reqParams.get('page')).toBe(params.get('page'));
    expect(req.request.params.getAll('filter[]')).toContain('isPlanet,eq,true');
    expect(req.request.params.getAll('filter[]')).toContain(`${filter.sortBy},cs,${filter.query}`);
  });
});
