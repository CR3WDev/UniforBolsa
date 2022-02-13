import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from 'app/models/User';

const userAPIurl = 'http://localhost:3000/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(userAPIurl);
  }

  createUser(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(userAPIurl, user);
  }

  editUser(user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(userAPIurl, user);
  }

  deleteUser(id: number): Observable<UserResponse['message']> {
    return this.http.delete<UserResponse['message']>(`${userAPIurl}/${id}`);
  }
}
