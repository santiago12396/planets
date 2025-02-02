import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolarSystemService } from '@/shared/services/solar-system.service';
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

  planet = signal<Body | null>(null);
  isLoadingResults = signal(true);
  isError = signal(false);

  ngOnInit(): void {
    this.isLoadingResults.set(true);
    this.isError.set(false);
    this.#solarSystemService.findOne(this.id()).subscribe({
      next: planet => {
        this.isLoadingResults.set(false);
        this.planet.set(planet);
      },
      error: () => {
        this.isLoadingResults.set(false);
        this.isError.set(true);
      },
    });
  }
}
