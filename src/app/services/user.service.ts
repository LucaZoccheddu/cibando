import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiBaseUrl = 'api/users'
  datiUtente = new ReplaySubject();
  userRole = new ReplaySubject();

  constructor(private http: HttpClient) { }

  aggiungiUtente(user: any) :Observable<User> {
    return this.http.post<any>(`${this.apiBaseUrl}/signup`, user);
  }

  getUser(email: string): Observable<any> {
    const emailUtente = {"email": email};
    return this.http.post<any>(`${this.apiBaseUrl}/user`, emailUtente);
  }
}
