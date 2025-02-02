import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register as registerSwiperElements } from 'swiper/element/bundle';

// Registra los elementos de Swiper para que esten disponibles antes de iniciar la app
registerSwiperElements();

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
