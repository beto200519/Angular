import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


interface Espacio {
  nombreEspacio: string;
  nombre: string;
  edificio: string;
  numeroSalon: string;
  carreraArea: string;
  encargado: string;
  idSensorActuador: string;
  estatus: string;
}




@Component({
  selector: 'app-space-access',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './space-access.component.html',
  styleUrl: './space-access.component.css'
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
