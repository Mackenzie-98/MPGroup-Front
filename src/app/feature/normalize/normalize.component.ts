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
  message: string = '';  // Mensaje mostrado en el notification bar
  messageType: 'success' | 'error' | 'info' = 'info';  // Tipo de mensaje (éxito, error, info)
  showModal: boolean = false;  // Controla la visualización del modal
  modalTitle: string = '';  // Título del modal
  modalMessage: string = '';  // Mensaje del modal
  showConfirmButton: boolean = false;  // Mostrar botón de confirmación en el modal

  constructor(private normalizationService: NormalizationService) { }

  // Método para normalizar y manejar errores
  normalize(overwrite = false) {
    if (this.nroMuestra && this.nroGenerico) {
      this.normalizationService.saveNormalization({ nroMuestra: this.nroMuestra, nroGenerico: this.nroGenerico, overwrite }).subscribe(
        () => {
          this.message = 'Normalización realizada con éxito.';
          this.messageType = 'success';
          setTimeout(() => this.clearMessage(), 10000);
          this.resetFields();
        },
        (error) => {
          if (error.status === 409) {
            // Mostrar el modal para confirmación de sobrescritura
            this.modalTitle = 'Confirmación de Sobrescritura';
            this.modalMessage = error.error.message || 'Conflicto al intentar normalizar la muestra.';
            this.showModal = true;
            this.showConfirmButton = true;  // Mostrar el botón de confirmación
          } else if (error.status === 404) {
            // Mostrar el mensaje de error 404 desde el backend
            this.message = error.error.message || 'Número de muestra no existente.';
            this.messageType = 'error';
          } else {
            // Mostrar otros mensajes de error desde el backend
            this.message = error.error.message || 'Error al guardar los datos. Inténtelo de nuevo.';
            this.messageType = 'error';
          }
        }
      );
    } else {
      this.message = 'Por favor, complete ambos campos.';
      this.messageType = 'error';
    }
  }

  // Método para confirmar sobrescritura
  confirmOverwrite() {
    this.showModal = false;
    this.normalize(true);  // Llamar a la normalización con overwrite = true
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
  }

  // Limpiar el mensaje de notificación
  clearMessage() {
    this.message = '';
    this.messageType = 'info';
  }

  // Resetear campos de entrada
  resetFields() {
    this.nroMuestra = '';
    this.nroGenerico = '';
  }

  // Validar solo alfanuméricos en la entrada
  allowOnlyAlphanumeric(event: KeyboardEvent): void {
    const inputChar = event.key;
    if (!/^[a-zA-Z0-9]$/.test(inputChar)) {
      event.preventDefault();  // Prevenir la entrada del carácter no permitido
    }
  }

  // Transformar la entrada a mayúsculas
  transformToUppercase(field: string) {
    if (field === 'nroMuestra') {
      this.nroMuestra = this.nroMuestra.toUpperCase();
    } else if (field === 'nroGenerico') {
      this.nroGenerico = this.nroGenerico.toUpperCase();
    }
  }
}
