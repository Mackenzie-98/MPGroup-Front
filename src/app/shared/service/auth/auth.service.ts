import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../model/auth/auth-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl: string = 'http://localhost:3000/auth';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { username, password });
    }

    logout(): void {
        localStorage.removeItem('user');
    }
}
