import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SolarSystemService } from '@/shared/services/solar-system.service';
import { StorageService } from '@/shared/services/storage.service';
import { LoaderComponent } from '@/shared/components/loader/loader.component';
import NotFoundComponent from '@/shared/components/not-found/not-found.component';
import { Body } from '@/shared/models';

@Component({
  selector: 'app-view-planet',
  imports: [RouterLink, LoaderComponent, NotFoundComponent],
  templateUrl: './view-planet.component.html',
  styleUrl: './view-planet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViewPlanetComponent implements OnInit {
  readonly id = input.required<string>();

  readonly #solarSystemService = inject(SolarSystemService);
  readonly #storageService = inject(StorageService);

  planet = signal<Body | null>(null);
  isLoadingResults = signal(true);
  isError = signal(false);
  isFavorite = signal(false);

  ngOnInit(): void {
    this.isLoadingResults.set(true);
    this.isError.set(false);
    this.#solarSystemService.findOne(this.id()).subscribe({
      next: planet => {
        this.isLoadingResults.set(false);
        this.planet.set(planet);
        this.checkFavorite(planet.id);
      },
      error: () => {
        this.isLoadingResults.set(false);
        this.isError.set(true);
      },
    });
  }

  checkFavorite(planetId: string) {
    const favoriteIds = this.#storageService.get<string[]>('favorites') ?? [];

    if (favoriteIds.includes(planetId)) {
      this.isFavorite.set(true);
      return;
    }

    this.isFavorite.set(false);
  }

  handleToggleFavorites() {
    this.isFavorite.set(!this.isFavorite());
    let favoriteIds = this.#storageService.get<string[]>('favorites') ?? [];

    if (this.isFavorite()) {
      if (favoriteIds.length === 0) {
        this.#storageService.set('favorites', [this.planet()!.id]);
        return;
      }

      if (!favoriteIds.includes(this.planet()!.id)) {
        favoriteIds.push(this.planet()!.id);
        this.#storageService.set('favorites', favoriteIds);
      }

      return;
    }

    if (favoriteIds.length > 0) {
      favoriteIds = favoriteIds.filter(id => id !== this.planet()!.id);
      this.#storageService.set('favorites', favoriteIds);
    }
  }
}
