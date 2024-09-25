import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../../shared/service/calculator/calculator.service';
import { Calculation } from '../../../shared/model/calculator/calculation';

@Component({
  selector: 'app-ingenieria-info',
  templateUrl: './ingenieria-info.component.html',
  styleUrls: ['./ingenieria-info.component.scss']
})
export class IngenieriaInfoComponent implements OnInit {
  calculations: Calculation[] = [];
  filteredCalculations: Calculation[] = [];
  selectedCalculation: Calculation | null = null;
  searchTerm: string = '';

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.fetchCalculations();
  }

  fetchCalculations(): void {
    this.calculatorService.getAllCalculations().subscribe(
      (data: Calculation[]) => {
        this.calculations = data;
        this.filteredCalculations = data; // Inicialmente, los datos filtrados son todos
      },
      (error) => {
        console.error('Error al obtener los cálculos', error);
      }
    );
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredCalculations = this.calculations.filter(calculation =>
      calculation.nroMuestra.toString().toLowerCase().includes(term) ||
      (calculation.nroGenerico && calculation.nroGenerico.toLowerCase().includes(term)) ||
      this.getSentidoLabel(calculation.sentido).toLowerCase().includes(term) ||
      calculation.linea.toLowerCase().includes(term) ||
      calculation.tallaBase.toString().toLowerCase().includes(term) ||
      calculation.sesgo.toString().toLowerCase().includes(term) ||
      calculation.createdBy.toLowerCase().includes(term) ||
      calculation.dateCreated.toLocaleString().toLowerCase().includes(term)
    );
  }

  viewDetails(calculation: Calculation): void {
    this.selectedCalculation = calculation;
  }

  closeDetails(): void {
    this.selectedCalculation = null;
  }

  getSentidoLabel(sentido: number): string {
    switch (sentido) {
      case 1:
        return 'Al Traves';
      case 2:
        return 'Al Hilo';
      case 3:
        return 'Al Sesgo';
      default:
        return 'Desconocido';
    }
  }
}
