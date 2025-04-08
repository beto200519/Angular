import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component'; // Asumimos que AppComponent está en ./app/app.component
import { routes } from './app/app.routes'; // Archivo donde defines las rutas

// Aquí, se hace el bootstrap de la aplicación principal
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),        // Configuración de las rutas
    importProvidersFrom(HttpClientModule), // Incluir HttpClientModule globalmente
  ],
});
