import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

interface Espacio {
  nombreEspacio: string;
  nombre: string;
  edificio: string;
  numeroSalon: string;
  carreraArea: string;
  encargado: string;
  idSensorActuador: string;
  HorarioInicio: string; 
  HorarioFin: string;
  estatus: string;
}

@Component({
  selector: 'app-space-access',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './space-access.component.html',
  styleUrls: ['./space-access.component.css']
})
export class SpaceAccessComponent {
  espacioForm: FormGroup;
  espacios: Espacio[] = []  ;
  espaciosFiltrados: Espacio[] = [];
  filtroEstatus: string = '';

  constructor(private fb: FormBuilder) {
    this.espacioForm = this.fb.group({
      nombreEspacio: ['', Validators.required],
      edificioSalon: ['', Validators.required],
      carreraArea: ['', Validators.required],
      encargado: ['', Validators.required],
      idSensorActuador: ['', Validators.required],
      HorarioInicio: ['', Validators.required],
      HorarioFin: ['', Validators.required],
      estatus: ['Disponible', Validators.required]
    });
    
    this.espaciosFiltrados = this.espacios; 
  }

  registrarEspacio() {
    if (this.espacioForm.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const nuevoEspacio: Espacio = this.espacioForm.value as Espacio;

    const horaActual = new Date();
    const [HorasInicio, minutosInicio] = nuevoEspacio.HorarioInicio.split(':').map(Number);
    const [HorasFin, minutosFin] = nuevoEspacio.HorarioFin.split(':').map(Number);

    const inicio = new Date();
    inicio.setHours(HorasInicio, minutosInicio, 0);

    const fin = new Date();
    fin.setHours(HorasFin, minutosFin, 0);

    if (horaActual >= fin) {
    nuevoEspacio.estatus = 'No Disponible';
   } else {
    nuevoEspacio.estatus = 'Disponible';
   }

    this.espacios.push(nuevoEspacio);
    this.espacioForm.reset();
    this.filtrarEspacios();
    alert('Espacio registrado exitosamente.');
}

  filtrarEspacios() {
    if (this.filtroEstatus === 'No Disponible') {
      this.espaciosFiltrados = this.espacios.filter(espacio => espacio.estatus === 'No Disponible');
    } else {
      this.espaciosFiltrados = this.espacios;
    }
  }
}