import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PermissionService } from '../services/permission.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { User } from './user.model';

@Component({
  selector: 'app-permission',
  imports: [CommonModule, FormsModule,  HttpClientModule,  HeaderComponent],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
  
})
export class PermissionComponent implements OnInit {
  permissions: any[] = [];
  searchTerm: string = ''; // Para la búsqueda
  filteredPermissions: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPermisos();
  }

  getPermisos(): void {
    this.http.get<any>('https://localhost:7159/api/Permisos/Get').subscribe(
      data => {
        this.permissions = data;  // Asignamos los datos de la API a la propiedad
        this.filteredPermissions = this.permissions;
      },
      error => {
        console.error('Error fetching permissions:', error);
      }
    );
  }

  filterPermissions(): void {
    this.filteredPermissions = this.permissions.filter(perm => 
      perm.usuarioId.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterPermissions();
  }
}

