import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

interface AccessRecord {
  id: number;
  nombre: string;
  rol: string;
  puerta: string;
  dia: string;
  hora: string;
}

@Component({
  selector: 'app-loghistory',
  imports: [CommonModule, FormsModule,HeaderComponent],
  templateUrl: './loghistory.component.html',
  styleUrl: './loghistory.component.css'
})
export class LoghistoryComponent {
  searchTerm: string = '';
  
  accessRecords: AccessRecord[] = [
    { id: 87546, nombre: 'René Estrella', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' },
    { id: 87547, nombre: 'René Estrella', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' },
    { id: 87548, nombre: 'René Estrella', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' },
    { id: 87549, nombre: 'René Estrella', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' },
    { id: 87550, nombre: 'José Luis', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' },
    { id: 87551, nombre: 'José Luis', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' },
    { id: 87552, nombre: 'José Luis', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' },
    { id: 87553, nombre: 'José Luis', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' },
    { id: 87554, nombre: 'José Luis', rol: 'Docente', puerta: '1101', dia: '07/03/25', hora: '09:32 A.M.' }
  ];

  clearSearch() {
    this.searchTerm = '';
  }
}
