import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  private gettUrl = 'https://ml1ctcld-7149.usw3.devtunnels.ms/api/Permisos/GetById';
 
  private postUrl = 'https://ml1ctcld-7149.usw3.devtunnels.ms/api/Permisos/Post';


  private putUrl = 'https://ml1ctcld-7149.usw3.devtunnels.ms/api/Permisos/Put';


  private deleteUrl = 'https://ml1ctcld-7149.usw3.devtunnels.ms/api/Permisos/Delete';


  constructor(private http: HttpClient) {}


  getPermisoPorId(id: string, token: string): Observable<any> {
    const url = `${this.gettUrl}/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });


    return this.http.get(url, { headers });
  }


  putPermisos(id: string, permiso: any, token: string): Observable<any> {
    const url = `${this.putUrl}/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
 
    return this.http.put(url, permiso, { headers });
  }


  deletePermisos(id: string, token: string): Observable<any> {
    const url = `${this.deleteUrl}/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
 
    return this.http.delete(url, { headers });
  }


  postPermisos(data: any, token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(this.postUrl, data, { headers });
  }


}  
