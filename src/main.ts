import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule  } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(),
    provideRouter(routes),
    RouterModule
  ]
});