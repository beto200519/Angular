import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterModule } from '@angular/router';




@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule,HeaderComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
 
})
export class PermissionComponent {
  permisoForm: FormGroup;


  constructor(
    private router: Router,
    private permisoService: PermissionService,
    private fb: FormBuilder
  ) {
    this.permisoForm = this.fb.group({
      ID: [''],
      Usuarioid: ['', Validators.required],
      Puertasid: ['', Validators.required],
      Puesto: ['', Validators.required],
      Dias: ['', Validators.required],
      Horas: ['', Validators.required]
    });
  }


  altapermisos() {
    this.router.navigate(['/permisos']);
  }


  listapermisos() {
    this.router.navigate(['/lista-permisos']);
  }


  ngOnInit(): void {
    // Detectar cambios en el campo ID
    this.permisoForm.get('ID')?.valueChanges.subscribe((id: string) => {
      if (id) {
        this.obtenerPermisoPorId(id);
      }
    });
  }


  // Método para obtener el permiso por ID
  obtenerPermisoPorId(permisoId: string) {
    const token = localStorage.getItem('token') || '';


    this.permisoService.getPermisoPorId(permisoId, token).subscribe({
      next: (res: any) => {
        // Aquí actualizas el formulario con los datos del permiso
        this.permisoForm.patchValue({
          Usuarioid: res.usuarioId,
          Puertasid: res.puertasId,
          Puesto: res.puesto,
          Dias: res.dias,
          Horas: res.horas
        });
      },
      error: (err: any) => {
        console.error('Error al obtener el permiso:', err);
        alert('No se encontró el permiso con ese ID');
      }
    });
  }


   // Método para limpiar el formulario
   limpiarFormulario() {
    this.permisoForm.reset();
  }


  actualizarPermiso() {
    if (this.permisoForm.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
 
    const permisoData = this.permisoForm.value;
    const id = permisoData.ID;
    console.log('ID a enviar:', id);
    const token = localStorage.getItem('token') || '';
 
    console.log('Datos a enviar:', permisoData);  // Revisa que los datos son correctos
 
    this.permisoService.putPermisos(id, permisoData, token).subscribe({
      next: () => {
        alert('Permiso actualizado exitosamente');
        this.permisoForm.reset();
      },
      error: (err: any) => {
        console.error('Error al actualizar el permiso:', err);
        alert(`Error al actualizar el permiso: ${err.status} ${err.statusText}`);
      }
    });
  }


  eliminarPermiso() {
    const permisoId = this.permisoForm.get('ID')?.value;
    const token = localStorage.getItem('token') || '';
 
    if (!permisoId) {
      alert('Por favor, ingresa el ID del permiso a eliminar.');
      return;
    }
 
    console.log(`ID a eliminar: ${permisoId}`);
 
    const confirmar = confirm(`¿Estás seguro de que quieres eliminar el permiso con ID ${permisoId}?`);
    if (!confirmar) {
      console.log('Eliminación cancelada');
      return;
    }
 
    console.log('Confirmación recibida, procediendo con la eliminación...');
 
    this.permisoService.deletePermisos(permisoId, token).subscribe({
      next: () => {
        console.log('Permiso eliminado');
        alert('Permiso eliminado exitosamente');
        this.permisoForm.reset();
      },
      error: (err: any) => {
        console.error('Error al eliminar el permiso:', err);
        alert(`Error al eliminar el permiso: ${err.status} ${err.statusText}`);
      }
    });
  }


  registrarPermiso() {
    if (this.permisoForm.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
 
    // Crear una copia de los datos del formulario
    const permisoData = { ...this.permisoForm.value };
 
    // Eliminar el campo 'ID' para que no se envíe al servidor
    delete permisoData.ID;
 
    const token = localStorage.getItem('token') || '';
   
    this.permisoService.postPermisos(permisoData, token).subscribe({
      next: (res: any) => {
        console.log(res); // Ver la respuesta del servidor
        alert('Permiso registrado exitosamente');
        this.permisoForm.reset();
      },
      error: (err: any) => {
        console.error(err); // Ver los errores
        alert('Error al registrar el permiso');
      }
    });
  }
}
