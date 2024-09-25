// src/app/shared/service/cut-section/cut-section.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';
import { CorteRecalculation } from '../../model/cut-section/recalculate-results';

@Injectable({
    providedIn: 'root'
})
export class CutSectionService {
    private baseUrl: string = `${environment.apiUrl}/cut-section`;

    constructor(private http: HttpClient) { }

    validateCut(genericNumber: string, orderNumber: string, width: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/validate`, { genericNumber, orderNumber, width });
    }

    recalculateCut(genericNumber: string, orderNumber: string, width: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/recalculate`, { genericNumber, orderNumber, width });
    }

    getAllRecalculations(): Observable<CorteRecalculation[]> {
        return this.http.get<CorteRecalculation[]>(`${this.baseUrl}/all-recalculations`);
    }
}
