import type { SwiperContainer } from 'swiper/element';
import { EMPTY, map, Observable } from 'rxjs';
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

import { PlanetItemComponent } from '@/shared/components/planet-item/planet-item.component';
import { SolarSystemService } from '@/shared/services/solar-system.service';
import { Body, BodyResponse, Order } from '@/shared/models';
import { LoaderComponent } from '@/shared/components/loader/loader.component';

@Component({
  selector: 'app-planets',
  imports: [PlanetItemComponent, LoaderComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class PlanetsComponent implements OnInit, AfterViewInit {
  readonly swiper = viewChild.required<ElementRef<unknown>>('swiper');

  readonly #solarSystemService = inject(SolarSystemService);

  planets = linkedSignal<Body[]>(() => []);

  isLoadingResults = signal(true);
  isFetching = signal(false);

  currentPage = signal(1);
  limit = signal(5);
  sortBy = signal('englishName');
  order = signal(Order.Asc);
  query = signal('');

  ngOnInit(): void {
    this.#loadData().subscribe(planets => this.planets.set(planets));
  }

  ngAfterViewInit(): void {
    (this.swiper().nativeElement as SwiperContainer).initialize();
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

  handlePrevButton() {
    if (this.currentPage() > 1 && !this.isFetching()) {
      // Desplaza el carrusel 5 posiciones hacia atrás
      (this.swiper().nativeElement as SwiperContainer).swiper.slideTo(
        (this.currentPage() - 2) * this.limit()
      );

      this.currentPage.set(this.currentPage() - 1);
      this.#loadData().subscribe(planets => this.planets.set(planets));
    }
  }

  handleNextButton() {
    if (!this.isFetching()) {
      const currentPage = this.currentPage();

      // Desplaza el carrusel 5 posiciones hacia adelante
      (this.swiper().nativeElement as SwiperContainer).swiper.slideTo(currentPage * this.limit());

      this.currentPage.set(currentPage + 1);
      this.#loadData().subscribe(planets => this.planets.set(planets));
    }
  }

  isPrevDisabled(): boolean {
    return this.currentPage() === 1;
  }

  isNextDisabled(): boolean {
    return this.planets().length < this.limit();
  }
}
