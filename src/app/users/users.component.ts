import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-users',
  imports: [HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombreCompleto: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/) // Solo letras y espacios
        ]
      ],
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ],
      telefono: [
        '',
        [
          Validators.pattern(/^(\+?52|0052)?\s?(\d{10})$/) // Teléfono mexicano opcional
        ]
      ],
      matricula: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Z0-9-]+$/) // Letras mayúsculas, números y guiones
        ]
      ],
      area: [
        '',
        [Validators.required]
      ],
      usuario: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_]+$/) // Letras, números y guion bajo
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) // Contraseña segura
        ]
      ],
      confirmPassword: [
        '',
        [Validators.required]
      ],
      tipoUsuario: [
        '',
        [Validators.required]
      ]
    }, {
      validators: this.passwordMatchValidator // Validación de coincidencia de contraseñas
    });
  }

  // Método para validar que las contraseñas coincidan
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Método para registrar usuario
  registrarUsuario() {
    if (this.userForm.invalid) {
      console.log('Errores de validación:', this.userForm.errors);
      return;
    }
    console.log('Formulario válido, enviando datos:', this.userForm.value);
  }
}