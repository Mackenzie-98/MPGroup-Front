import { Component } from '@angular/core';
import { NormalizationService } from '../../shared/service/normalize/normalize.service';

@Component({
  selector: 'app-normalize',
  templateUrl: './normalize.component.html',
  styleUrls: ['./normalize.component.scss']
})
export class NormalizeComponent {
  nroMuestra: string = '';
  nroGenerico: string = '';
  message: string = '';
  messageType: 'success' | 'error' | 'info' = 'info';
  showModal: boolean = false;  // Controla la visualización del modal
  conflictMessage: string = '';  // Mensaje de conflicto a mostrar en el modal

  constructor(private normalizationService: NormalizationService) { }

  normalize(overwrite = false) {
    if (this.nroMuestra && this.nroGenerico) {
      this.normalizationService.saveNormalization({ nroMuestra: this.nroMuestra, nroGenerico: this.nroGenerico, overwrite }).subscribe(
        () => {
          this.message = 'Normalización realizada con éxito.';
          this.messageType = 'success';
          setTimeout(() => this.closeSuccess(), 10000);
          this.resetFields();
        },
        (error) => {
          if (error.status === 409) {
            this.conflictMessage = error.error.message;
            this.showModal = true;
          } else if (error.status === 404) {
            this.message = 'Número de muestra no existente.';
          } else {
            this.message = 'Error al guardar los datos. Inténtelo de nuevo.';
          }
          this.messageType = 'error';
        }
      );
    } else {
      this.message = 'Por favor, complete ambos campos.';
      this.messageType = 'error';
    }
  }

  closeSuccess() {
    this.message = '';
  }

  resetFields() {
    this.nroMuestra = '';
    this.nroGenerico = '';
  }

  clearMessage() {
    this.message = '';
    this.messageType = 'info';
  }

  confirmOverwrite() {
    this.showModal = false;
    this.normalize(true);  // Llamar a la normalización con overwrite = true
  }

  closeModal() {
    this.showModal = false;
  }
}
