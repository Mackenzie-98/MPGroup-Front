import { Component } from '@angular/core';
import { CutSectionService } from '../../shared/service/cut-section/cut-section.service';

@Component({
  selector: 'app-cut-section',
  templateUrl: './cut-section.component.html',
  styleUrls: ['./cut-section.component.scss']
})
export class CutSectionComponent {
  genericNumber: string = '';
  orderNumber: string = '';
  width: number = 0;
  showRecalculateModal: boolean = false;
  modalMessage: string = '';
  modalTitle: string = '';
  showConfirmButton: boolean = false;

  constructor(private cutSectionService: CutSectionService) { }

  checkCut() {
    this.cutSectionService.validateCut(this.genericNumber, this.orderNumber, this.width).subscribe(
      (response) => {
        if (response.isValid) {
          this.showModal('Validación exitosa', response.message, false);
        } else if (response.recalculate) {
          this.showModal('Recalcular Consumo', response.message, true);
        }
      },
      (error) => {
        this.showModal('Error', error.message, false);
      }
    );
  }

  showModal(title: string, message: string, showConfirmButton: boolean) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.showConfirmButton = showConfirmButton; // Asegúrate de que esta línea está correctamente configurada.
    this.showRecalculateModal = true;
  }

  closeRecalculateModal() {
    this.showRecalculateModal = false;
  }

  confirmRecalculate() {
    this.recalculate();
    this.closeRecalculateModal();
  }

  recalculate() {
    this.cutSectionService.recalculateCut(this.genericNumber, this.orderNumber, this.width).subscribe(
      (response) => {
        this.showModal('Recalculo Exitoso', 'El consumo ha sido recalculado y almacenado con éxito.', false);
      },
      (error) => {
        this.showModal('Error', 'Error al recalcular y guardar el consumo.', false);
      }
    );
  }
}
