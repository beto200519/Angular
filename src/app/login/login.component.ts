import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ← Agregado HttpClientModule aquí
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    correo: '',
    clave: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const url = 'https://ml1ctcld-7149.usw3.devtunnels.ms/api/auth/login';
    console.log(this.loginData); //BORRALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO <----------------------
    //console.log(this.loginData); // Verifica que los datos de inicio de sesión sean correctos
    this.http.post<any>(url, this.loginData).subscribe({
      next: (res) => {
        const token = res.token;
        localStorage.setItem('token', token);

        this.http.get('https://ml1ctcld-7149.usw3.devtunnels.ms/api/Usuario/Get', {
          headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`          })
        }).subscribe({
          next: (user) => {
            this.router.navigate(['/tablero']);
          },
          error: () => {
            alert('Error al obtener los datos del usuario.');
          }
        });
      },
      error: () => {
        alert('Correo o contraseña incorrectos.');
      }
    });
  }

  loginWithGoogle() {
    this.router.navigate(['/tablero']);
  }
}