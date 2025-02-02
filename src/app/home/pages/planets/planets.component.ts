import type { SwiperContainer } from 'swiper/element';
import {
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  linkedSignal,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SolarSystemService } from '@/shared/services/solar-system.service';
import { PlanetItemComponent } from '@/shared/components/planet-item/planet-item.component';
import { LoaderComponent } from '@/shared/components/loader/loader.component';
import { SearchInputComponent } from '@/shared/components/search-input/search-input.component';
import { OrderByComponent } from '@/shared/components/order-by/order-by.component';
import { Body, BodyResponse, Order } from '@/shared/models';

@Component({
  selector: 'app-planets',
  imports: [PlanetItemComponent, LoaderComponent, SearchInputComponent, OrderByComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class PlanetsComponent implements OnInit, AfterViewInit {
  readonly swiper = viewChild.required<ElementRef<unknown>>('swiper');

  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #solarSystemService = inject(SolarSystemService);

  planets = linkedSignal<Body[]>(() => []);

  isLoadingResults = signal(true);
  isFetching = signal(false);

  currentPage = signal(1);
  limit = signal(5);
  sortBy = signal('englishName');
  order = signal(Order.Asc);
  query = signal('');

  #searchSubject = new Subject<string>();

  constructor() {
    this.#route.queryParams.subscribe(params => {
      const { order, query } = params;

      if (order) this.order.set(order);
      if (query) this.query.set(query);
    });
  }

  ngOnInit(): void {
    // Cuando se inicializa el componente
    this.#fetchAndSetPlanets();

    // Cuando cambia el buscador
    this.#searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => this.#loadData())
      )
      .subscribe({
        next: planets => this.planets.set(planets),
        error: () => this.#noData(),
      });
  }

  ngAfterViewInit(): void {
    (this.swiper().nativeElement as SwiperContainer).initialize();
  }

  #noData() {
    this.isLoadingResults.set(false);
  }

  #getFilter() {
    return {
      limit: this.limit(),
      currentPage: this.currentPage(),
      sortBy: this.sortBy(),
      order: this.order(),
      query: this.query(),
    };
  }

  #loadData(): Observable<Body[]> {
    if (this.isFetching()) return EMPTY;

    this.isLoadingResults.set(true);
    this.isFetching.set(true);

    return this.#solarSystemService.getPlanets(this.#getFilter()).pipe(
      map((response: BodyResponse) => {
        this.isLoadingResults.set(false);
        this.isFetching.set(false);
        return response.bodies;
      })
    );
  }

  #fetchAndSetPlanets() {
    this.#loadData().subscribe({
      next: planets => this.planets.set(planets),
      error: () => this.#noData(),
    });
  }

  #updateUrlParams() {
    this.#router.navigate([], {
      relativeTo: this.#route,
      queryParams: {
        order: this.order(),
        query: this.query(),
      },
      queryParamsHandling: 'merge', // Mantiene y actualiza solo los parametros que cambiaron
    });
  }

  handleSearchTerm(value: string) {
    if (!value) this.currentPage.set(1);

    this.query.set(value);
    this.#searchSubject.next(value);
    this.#updateUrlParams();
  }

  handleSortBy(value: string) {
    this.sortBy.set(value);
    this.#fetchAndSetPlanets();
    this.#updateUrlParams();
  }

  handleOrder(value: Order) {
    this.order.set(value);
    this.#fetchAndSetPlanets();
    this.#updateUrlParams();
  }

  handlePrevButton() {
    if (this.currentPage() > 1 && !this.isFetching()) {
      // Desplaza el carrusel 5 posiciones hacia atrás
      (this.swiper().nativeElement as SwiperContainer).swiper.slideTo(
        (this.currentPage() - 2) * this.limit()
      );

      this.currentPage.set(this.currentPage() - 1);
      this.#fetchAndSetPlanets();
    }
  }

  handleNextButton() {
    if (!this.isFetching()) {
      const currentPage = this.currentPage();

      // Desplaza el carrusel 5 posiciones hacia adelante
      (this.swiper().nativeElement as SwiperContainer).swiper.slideTo(currentPage * this.limit());

      this.currentPage.set(currentPage + 1);
      this.#fetchAndSetPlanets();
    }
  }

  isPrevDisabled(): boolean {
    return this.currentPage() === 1 || this.planets().length === 0;
  }

  isNextDisabled(): boolean {
    return this.planets().length < this.limit() || this.planets().length === 0;
  }
}
