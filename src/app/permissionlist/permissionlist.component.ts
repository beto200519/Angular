
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../services/user.service';
import { DoorsService } from '../services/doors.service';
import { PermissionlistService } from '../services/permissionlist.service'; // para getPermisos


@Component({
  selector: 'app-permissionlist',
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent],
  templateUrl: './permissionlist.component.html',
  styleUrl: './permissionlist.component.css'
})
export class PermissionlistComponent {
  searchTerm: string = '';
  filteredPermissions: any[] = [];
  permisos: any[] = [];
  usuarios: any[] = [];
  puertas: any[] = [];




  constructor(private PermissionlistService : PermissionlistService, private userService: UserService,
    private doorsService: DoorsService) {}


    ngOnInit(): void {
      const token = localStorage.getItem('token');
      if (token) {
        // Primero obtener usuarios y puertas
        this.userService.getUser(token).subscribe(users => {
          this.usuarios = users;
 
          this.doorsService.getDoors(token).subscribe(puertas => {
            this.puertas = puertas;
 
            // Ahora los permisos
            this.PermissionlistService.getPermisos(token).subscribe({
              next: (data) => {
                // Mapear nombres de usuario y puerta
                this.permisos = data.map(p => {
                  const usuario = this.usuarios.find(u => u.id === p.usuarioId);
                  const puerta = this.puertas.find(d => d.id === p.puertasId);
 
                  return {
                    ...p,
                    usuarioNombre: usuario ? usuario.nombre : 'Desconocido',
                    puertaNombre: puerta ? puerta.nombre : 'Desconocido'
                  };
                });
 
                this.filteredPermissions = [...this.permisos];
              },
              error: () => {
                alert('Error al cargar los permisos.');
              }
            });
          });
        });
      } else {
        alert('Token no encontrado, inicia sesión.');
      }
    }
 
    filterPermissions() {
      this.filteredPermissions = this.permisos.filter(p =>
        Object.values(p).some(val =>
          String(val).toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
 
    clearSearch() {
      this.searchTerm = '';
      this.filteredPermissions = [...this.permisos];
    }
}