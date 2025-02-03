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
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SolarSystemService } from '@/shared/services/solar-system.service';
import { PlanetItemComponent } from '@/shared/components/planet-item/planet-item.component';
import { LoaderComponent } from '@/shared/components/loader/loader.component';
import { SearchInputComponent } from '@/shared/components/search-input/search-input.component';
import { OrderByComponent } from '@/shared/components/order-by/order-by.component';
import { Body, BodyResponse, Order } from '@/shared/models';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-planets',
  imports: [PlanetItemComponent, LoaderComponent, SearchInputComponent, OrderByComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class PlanetsComponent implements OnInit {
  swiper = signal<SwiperContainer | null>(null);

  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #solarSystemService = inject(SolarSystemService);

  planets = linkedSignal<Body[]>(() => []);

  isLoadingResults = signal(true);
  isFetching = signal(false);
  hasMorePages = signal(true);

  currentPage = signal(1);
  limit = signal(5);
  sortBy = signal('englishName');
  order = signal(Order.Asc);
  query = signal('');

  #searchSubject = new Subject<string>();

  constructor() {
    this.#updateLimitBasedOnScreenSize();

    this.#route.queryParams.subscribe(params => {
      const { order, query } = params;

      if (order) this.order.set(order);
      if (query) this.query.set(query);
    });
  }

  ngOnInit(): void {
    // Cuando se inicializa el componente
    this.#fetchAndSetPlanets();
    this.#initSwiper();

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

  #updateLimitBasedOnScreenSize() {
    const width = window.innerWidth;
    let newLimit = 5;

    if (width < 480) newLimit = 1;
    else if (width < 768) newLimit = 2;
    else if (width < 1024) newLimit = 3;
    else if (width < 1280) newLimit = 4;

    if (this.limit() !== newLimit) this.limit.set(newLimit);
  }

  #initSwiper() {
    const swiper = document.querySelector('swiper-container') as SwiperContainer;
    const swiperOptions: SwiperOptions = {
      slidesPerView: 5,
      spaceBetween: 20,
      breakpoints: {
        320: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      },
    };

    Object.assign(swiper, swiperOptions);
    this.swiper.set(swiper);
    this.swiper()?.initialize();
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

  #noData() {
    this.isLoadingResults.set(false);
  }

  #loadData(): Observable<Body[]> {
    if (this.isFetching()) return EMPTY;

    this.isLoadingResults.set(true);
    this.isFetching.set(true);

    return this.#solarSystemService.findAll(this.#getFilter()).pipe(
      map((response: BodyResponse) => {
        this.isLoadingResults.set(false);
        this.isFetching.set(false);
        this.hasMorePages.set(response.bodies.length === this.limit());
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

  handleResetFilters() {
    this.currentPage.set(1);
    this.sortBy.set('englishName');
    this.order.set(Order.Asc);
    this.query.set('');
    this.hasMorePages.set(true);

    this.#updateUrlParams();
    this.#fetchAndSetPlanets();
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
      const swiperInstance = this.swiper()?.swiper;

      // Desplaza el carrusel 5 posiciones hacia atrás
      swiperInstance?.slideTo((this.currentPage() - 2) * this.limit());

      this.currentPage.set(this.currentPage() - 1);
      this.#fetchAndSetPlanets();
    }
  }

  handleNextButton() {
    if (!this.isFetching()) {
      const swiperInstance = this.swiper()?.swiper;
      const currentPage = this.currentPage();

      // Desplaza el carrusel 5 posiciones hacia adelante
      swiperInstance?.slideTo(currentPage * this.limit());

      this.currentPage.set(currentPage + 1);
      this.#fetchAndSetPlanets();
    }
  }

  isPrevDisabled(): boolean {
    return this.currentPage() === 1 || this.planets().length === 0;
  }

  isNextDisabled(): boolean {
    return !this.hasMorePages() || this.planets().length === 0;
  }
}
