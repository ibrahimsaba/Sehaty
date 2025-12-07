import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://sehatymans.runasp.net/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Admin/GetAllUsers`, {
      headers: this.getAuthHeaders(),
    });
  }

  changeUserRole(userId: number, newRoleId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/Roles/ChangeUserRole`,
      {
        userId,
        newRoleId,
      },
      {
        headers: this.getAuthHeaders(),
        responseType: 'text',
      }
    );
  }
}
