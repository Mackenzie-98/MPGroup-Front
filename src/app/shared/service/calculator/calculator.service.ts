import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';
import { Calculation } from '../../model/calculator/calculation';

@Injectable({
    providedIn: 'root'
})
export class CalculatorService {
    private baseUrl: string = `${environment.apiUrl}/calculator`;

    constructor(private http: HttpClient) { }

    calculate(calculationData: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/calculate`, calculationData);
    }

    saveCalculation(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/save`, data);
    }

    getAllCalculations(): Observable<Calculation[]> {
        return this.http.get<Calculation[]>(`${this.baseUrl}/all`);
    }
}