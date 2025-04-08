import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  getuser(token: string) {
    throw new Error('Method not implemented.');
  }


 
  private userUrl = 'https://ml1ctcld-7149.usw3.devtunnels.ms/api/Usuario/Get';


  constructor(private http: HttpClient) {}


  getUser(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.userUrl, { headers });
  }
}