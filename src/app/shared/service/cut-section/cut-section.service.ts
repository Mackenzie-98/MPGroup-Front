// src/app/shared/service/cut-section/cut-section.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviroment.prod';

@Injectable({
    providedIn: 'root'
})
export class CutSectionService {
    private baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    validateCut(nroGenerico: string, nroOrden: string, nuevoAncho: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/validate`, { nroGenerico, nroOrden, nuevoAncho });
    }

    recalculateCut(genericNumber: string, orderNumber: string, width: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/recalculate`, { genericNumber, orderNumber, width });
    }
}
