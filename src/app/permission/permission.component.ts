import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

interface Permission {
  id: string;
  nombre: string;
  rol: string;
  puerta: string;
  dia: string;
  hora: string;
}

@Component({
  selector: 'app-permission',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
})
export class PermissionComponent {
  permissions: Permission[] = [
    { id: '87546', nombre: 'Nicol Gastelum', rol: 'Intendente', puerta: '1101', dia: 'L,M,M,J,V', hora: '9:00 AM - 8:00 PM' },
    { id: '87547', nombre: 'Jose Acuña', rol: 'Docente', puerta: '1101', dia: 'L,M,S', hora: '9:00 AM - 8:00 PM' },
    { id: '87548', nombre: 'René Estrella', rol: 'Docente', puerta: '1101', dia: 'L,J,V', hora: '9:00 AM - 8:00 PM' },
    { id: '87549', nombre: 'Alexa Gastelum', rol: 'Itendente', puerta: '1101', dia: 'M,M,D', hora: '9:00 AM - 8:00 PM' },
    { id: '87550', nombre: 'Norberto carrillo', rol: 'Director', puerta: '1101', dia: 'L,M,M,J,S,D', hora: '12:00 AM - 11:59 PM' }
  ];

  searchTerm: string = '';

  constructor() {}

  clearSearch() {
    this.searchTerm = '';
  }
}
