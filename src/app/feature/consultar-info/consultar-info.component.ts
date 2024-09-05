import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../shared/service/calculator/calculator.service';

@Component({
  selector: 'app-consultar-info',
  templateUrl: './consultar-info.component.html',
  styleUrls: ['./consultar-info.component.scss']
})
export class ConsultarInfoComponent implements OnInit {
  calculations: any[] = [];
  selectedCalculation: any = null;

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.fetchCalculations();
  }

  fetchCalculations(): void {
    this.calculatorService.getAllCalculations().subscribe(
      (data: any[]) => {
        this.calculations = data;
      },
      (error) => {
        console.error('Error fetching calculations', error);
      }
    );
  }

  viewDetails(calculation: any): void {
    this.selectedCalculation = calculation;
  }

  closeModal(): void {
    this.selectedCalculation = null;
  }
}
