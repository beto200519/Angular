import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';

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
  imports: [CommonModule, FormsModule,HeaderComponent, HttpClientModule],
  templateUrl: './loghistory.component.html',
  styleUrl: './loghistory.component.css'
})
export class LoghistoryComponent implements OnInit {
  searchTerm: string = '';
  accessRecords: AccessRecord[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAccessRecords();
  }

  loadAccessRecords(): void {
    this.http.get<AccessRecord[]>('https://localhost:7159/api/Historial/Get')
      .subscribe({
        next: (data) => {
          this.accessRecords = data;
        },
        error: (error) => {
          console.error('Error fetching access records:', error);
          // Agrega manejo de errores (ej: mostrar mensaje al usuario)
        }
      });
  }

  get filteredRecords(): AccessRecord[] {
    if (!this.searchTerm) return this.accessRecords;
    
    const searchLower = this.searchTerm.toLowerCase();
    return this.accessRecords.filter(record => 
      record.id.toString().includes(searchLower) ||
      record.nombre.toLowerCase().includes(searchLower) ||
      record.dia.toLowerCase().includes(searchLower) ||
      record.hora.toLowerCase().includes(searchLower)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
  }
}
