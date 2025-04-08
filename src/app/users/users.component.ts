import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioserviceService } from '../services/usuarioservice.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],  // Aquí estamos importando CommonModule
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;
  usuarios: any[] = [];
  editando = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioserviceService
  ) {
    this.userForm = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)]],
      confirmarClave: ['', Validators.required],
      pin: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      rol: ['', Validators.required]
    }, { validators: this.matchPasswords });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  matchPasswords(group: FormGroup) {
    const clave = group.get('clave')?.value;
    const confirmar = group.get('confirmarClave')?.value;
    return clave === confirmar ? null : { mismatch: true };
  }

  obtenerUsuarios() {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: data => {
        this.usuarios = data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        alert('Error al obtener usuarios: ' + err.message);
      }
    });
  }

  editarUsuario(usuario: any) {
    if (!usuario || !usuario.id) {
      alert('Usuario no encontrado');
      return;
    }
    this.userForm.patchValue(usuario);
    this.editando = true;
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado');
          this.obtenerUsuarios();
        },
        error: err => alert('Error al eliminar usuario: ' + err.message)
      });
    }
  }

  guardarUsuario() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const usuario = { ...this.userForm.value };
    delete usuario.confirmarClave;

    if (this.editando) {
      this.usuarioService.actualizarUsuario(usuario).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente');
          this.limpiarFormulario();
          this.obtenerUsuarios();
        },
        error: err => alert('Error al actualizar usuario: ' + err.message)
      });
    } else {
      this.usuarioService.crearUsuario(usuario).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.limpiarFormulario();
          this.obtenerUsuarios();
        },
        error: err => alert('Error al crear usuario: ' + err.message)
      });
    }
  }

  limpiarFormulario() {
    this.userForm.reset();
    this.editando = false;
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsUntouched();
    });
  }

  crearNuevo() {
    this.limpiarFormulario();
  }
}
