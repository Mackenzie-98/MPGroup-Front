import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../model/auth/auth-response';
import { environment } from '../../../../../enviroment.prod';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { username, password });
    }

    logout(): void {
        localStorage.removeItem('user');
    }
}
