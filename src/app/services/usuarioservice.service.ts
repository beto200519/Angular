import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioserviceService {
  private apiUrl = 'https://ml1ctcld-7149.usw3.devtunnels.ms/api/Usuario/Get';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se ha encontrado un token de autenticación.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  buscarUsuarioPorNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?nombre=${nombre}`, {
      headers: this.getAuthHeaders()
    });
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${usuario.id}`, usuario, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
