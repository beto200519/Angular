import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PermissionlistService {


  private apiUrl = 'https://ml1ctcld-7149.usw3.devtunnels.ms/api/Permisos/Get';


  constructor(private http: HttpClient) {}


  getPermisos(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }


}