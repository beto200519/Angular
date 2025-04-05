import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../permission/user.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = 'https://localhost:7159/api/Permisos/Get';

  constructor(private http: HttpClient) { }

  // Método para obtener los permisos
  getPermisos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
