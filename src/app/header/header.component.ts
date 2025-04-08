import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Para navegación
import { RouterModule } from '@angular/router'; // Para utilizar el router en un componente standalone

@Component({
  selector: 'app-header',
  standalone: true, // Indicar que este es un componente standalone
  imports: [RouterModule], // Asegúrate de que RouterModule esté importado aquí
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // Eliminar el token y navegar al login
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirigir al login
  }
}
