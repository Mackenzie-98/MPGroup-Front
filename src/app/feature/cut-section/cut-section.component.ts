import { Component } from "@angular/core";
import { CutSectionService } from "../../shared/service/cut-section/cut-section.service";
import { RecalculatedResult, Detalle } from "../../shared/model/cut-section/recalculate-results";

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
  recalculationResults: RecalculatedResult[] = [];
  detalleSeleccionado: Detalle[] | null = null;

  constructor(private cutSectionService: CutSectionService) { }

  checkCut() {
    this.cutSectionService.validateCut(this.genericNumber, this.orderNumber, this.width).subscribe(
      (response) => {
        if (response.recalculate) {
          this.showModal('Recalcular Consumo', response.message, true);
        } else {
          this.showModal('', response.message, false);
        }
      },
      (error) => {
        this.showModal('Error', error.error.message || 'Ocurrió un error al validar.', false);
      }
    );
  }

  recalculate() {
    this.cutSectionService.recalculateCut(this.genericNumber, this.orderNumber, this.width).subscribe(
      (response) => {
        this.recalculationResults = response.recalculatedResults;
        this.showModal('Recalculo Exitoso', 'El consumo ha sido recalculado con éxito.', false);
      },
      (error) => {
        this.showModal('Error', error.error.message || 'Error al recalcular y guardar el consumo.', false);
      }
    );
  }

  mostrarDetalle(detalles: Detalle[]) {
    this.detalleSeleccionado = detalles;
  }

  ocultarDetalle() {
    this.detalleSeleccionado = null;
  }

  showModal(title: string, message: string, showConfirmButton: boolean) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.showConfirmButton = showConfirmButton;
    this.showRecalculateModal = true;
  }

  closeRecalculateModal() {
    this.showRecalculateModal = false;
  }

  confirmRecalculate() {
    this.recalculate();
    this.closeRecalculateModal();
  }

  resetForm() {
    this.genericNumber = '';
    this.orderNumber = '';
    this.width = 0;
    this.recalculationResults = [];
    this.detalleSeleccionado = null;
    this.showRecalculateModal = false;
  }

  allowOnlyAlphanumeric(event: KeyboardEvent): void {
    const inputChar = event.key;
    // Solo permitir letras y números
    if (!/^[a-zA-Z0-9]$/.test(inputChar)) {
      event.preventDefault();  // Prevenir la entrada del carácter no permitido
    }
  }

  transformToUppercase(field: string) {
    if (field === 'orderNumber') {
      this.orderNumber = this.orderNumber.toUpperCase();
    } else if (field === 'genericNumber') {
      this.genericNumber = this.genericNumber.toUpperCase();
    }
  }
}
