import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../model/auth/auth-response';
import { environment } from '../../../../../environment';
import { User } from '../../model/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl: string = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) { }

    getUser(username: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${username}`);
    }

    // Método para actualizar los datos del usuario
    updateUser(username: string, userData: Partial<User> & { password?: string }): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${username}`, userData);
    }

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { username, password });
    }

    logout(): void {
        localStorage.removeItem('user');
    }
}
