import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NormalizationService {
    private baseUrl = 'http://localhost:3000/normalization';

    constructor(private http: HttpClient) { }

    saveNormalization(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/save`, data);
    }

    getAllNormalizations(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/all`);
    }
}
