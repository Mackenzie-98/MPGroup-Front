import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';
import { User } from '../../model/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    getUser(username: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${username}`);
    }

    updateUser(username: string, userData: Partial<User> & { password?: string }): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${username}`, userData);
    }

}
