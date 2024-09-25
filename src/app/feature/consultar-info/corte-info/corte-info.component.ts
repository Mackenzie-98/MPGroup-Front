import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutSectionService } from '../../../shared/service/cut-section/cut-section.service';
import { CorteRecalculation, RecalculatedResult } from '../../../shared/model/cut-section/recalculate-results';

@Component({
  selector: 'app-corte-info',
  templateUrl: './corte-info.component.html',
  styleUrls: ['./corte-info.component.scss']
})
export class CorteInfoComponent implements OnInit {
  recalculations: CorteRecalculation[] = [];
  selectedRecalculation: CorteRecalculation | null = null;
  selectedResult: RecalculatedResult | null = null;

  constructor(private cutSectionService: CutSectionService) { }

  ngOnInit(): void {
    this.fetchRecalculations();
  }

  fetchRecalculations(): void {
    this.cutSectionService.getAllRecalculations().subscribe(
      (data: CorteRecalculation[]) => {
        this.recalculations = data;
      },
      (error) => {
        console.error('Error al obtener los recalculos', error);
      }
    );
  }

  viewDetails(recalculation: CorteRecalculation): void {
    this.selectedRecalculation = recalculation;
    this.selectedResult = null; // Reiniciar selección de resultado
  }

  closeDetails(): void {
    this.selectedRecalculation = null;
    this.selectedResult = null;
  }

  viewResultDetails(result: RecalculatedResult): void {
    this.selectedResult = result;
  }

  closeResultDetails(): void {
    this.selectedResult = null;
  }
}
