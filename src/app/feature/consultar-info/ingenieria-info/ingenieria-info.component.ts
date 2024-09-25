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
  selectedCalculation: Calculation | null = null;

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.fetchCalculations();
  }

  fetchCalculations(): void {
    this.calculatorService.getAllCalculations().subscribe(
      (data: Calculation[]) => {
        this.calculations = data;
      },
      (error) => {
        console.error('Error al obtener los cálculos', error);
      }
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
