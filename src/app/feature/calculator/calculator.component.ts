import { Component } from '@angular/core';
import { DetallePorTalla } from '../../shared/model/calculator/detalle-por-talla';
import { Resultado } from '../../shared/model/calculator/resultado';
import { Talla } from '../../shared/model/calculator/talla';
import { CalculatorService } from '../../shared/service/calculator/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  Math = Math;

  medidaCount = 0;
  detallesPorTalla: { [key: string]: DetallePorTalla } = {};
  lineaSeleccionada = 'dama';
  ancho = 0;
  optSesgo = 1;
  tallaInicial = 0;
  medidas = [{ value: 0, escala: 0 }];
  resultados: Resultado[] = [];
  tallas: Talla[] = [];
  detalleVisible = false;
  detalleSeleccionado: Resultado | null = null;
  errorMessage: string = '';
  resultadosCalculados: boolean = false;
  anchoDeshabilitado: boolean = false;
  successMessage: string = '';
  infoMessage: string = '';
  sesgoOptions: string[] = [];
  sesgo: string = '';
  sesgoList: { [key: number]: string[] } = {
    1: ['1', '2,1', '2,2', '2,7', '3,2', '3,7', '4,2', '4,7', '5,2', '5,7', '6,2', '7,2', '7,7', '8,2'],
    2: ['1', '1,9', '2,1', '2,2', '2,7', '3', '3,2', '3,7', '4,2', '4,7', '5,2', '5,7', '6,2', '7,2', '7,7', '8,2'],
    3: ['2,7', '3,2', '3,7', '4,2', '4,7', '5,2', '5,7']
  };



  showSaveModal = false;
  nroMuestra: string = '';

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {
    this.actualizarTallas();
    this.updateSesgoOptions();
  }

  updateSesgoOptions() {
    this.sesgoOptions = this.sesgoList[this.optSesgo];
  }

  allowOnlyAlphanumeric(event: KeyboardEvent): void {
    const inputChar = event.key;
    // Solo permitir letras y números
    if (!/^[a-zA-Z0-9]$/.test(inputChar)) {
      event.preventDefault();  // Prevenir la entrada del carácter no permitido
    }
  }

  actualizarTallas() {
    if (this.lineaSeleccionada === 'dama') {
      this.tallas = [
        { key: 'XS', value: -1 },
        { key: 'S', value: 0 },
        { key: 'M', value: 1 },
        { key: 'L', value: 2 },
        { key: 'XL', value: 3 },
        { key: 'XXL', value: 4 },
      ];
    } else if (this.lineaSeleccionada === 'caballero') {
      this.tallas = [
        { key: 'S', value: -1 },
        { key: 'M', value: 0 },
        { key: 'L', value: 1 },
        { key: 'XL', value: 2 },
      ];
    } else if (this.lineaSeleccionada === 'chiqui') {
      this.tallas = [
        { key: '2', value: -1 },
        { key: '4', value: 0 },
        { key: '6', value: 1 },
        { key: '8', value: 2 },
        { key: '10', value: 3 },
        { key: '12', value: 4 },
        { key: '14', value: 5 },
        { key: '16', value: 6 },
      ];
    }

    const defaultTalla = this.tallas.find(talla => talla.value === 0);
    this.tallaInicial = defaultTalla ? defaultTalla.value : this.tallas[0].value;

  }


  openSaveModal() {
    this.showSaveModal = true;
  }

  closeSaveModal() {
    this.showSaveModal = false;
    this.nroMuestra = "";
    this.sesgo = '';
  }


  saveData() {
    if (!this.nroMuestra || !this.sesgo) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    if (!this.nroMuestra.match(/^[a-zA-Z0-9]+$/)) {
      this.errorMessage = 'El Nro. Muestra debe contener solo letras y números.';
      return;
    }

    const formattedSesgo = this.replaceDotWithComma(this.sesgo);

    const dataToSave = {
      nroMuestra: this.nroMuestra,
      ancho: this.ancho,
      sentido: this.optSesgo,
      linea: this.lineaSeleccionada,
      tallaBase: this.tallaInicial,
      tallas: this.tallas,
      medidas: this.medidas,
      resultados: this.resultados,
      detalles: this.detallesPorTalla,
      sesgo: parseFloat(formattedSesgo),
    };

    this.calculatorService.saveCalculation(dataToSave).subscribe(
      () => {
        this.errorMessage = '';
        this.closeSaveModal();
        this.successMessage = '¡Los datos se guardaron con éxito!';
        setTimeout(() => this.closeSuccess(), 10000);
        this.reiniciar();
      },
      error => {
        this.errorMessage = error.error.message || 'Error al guardar el cálculo.';
        setTimeout(() => this.closeError(), 10000);
      }
    );
  }

  closeError() {
    this.errorMessage = '';
  }

  closeSuccess() {
    this.successMessage = '';
  }

  closeInfo() {
    this.infoMessage = '';
  }

  addMedida() {
    this.medidaCount++;
    this.medidas.push({ value: 0, escala: 0 });
  }

  removeMedida(index: number) {
    this.medidas.splice(index, 1);
    this.medidaCount--;
  }

  calcular() {
    this.resultados = [];
    this.detallesPorTalla = {};
    this.errorMessage = '';
    this.resultadosCalculados = false;

    if (!this.validateInputs()) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
      setTimeout(() => this.closeError(), 10000);
      return;
    }

    if (this.optSesgo != 2 && (isNaN(this.ancho) || this.ancho <= 0)) {
      this.errorMessage = 'Por favor, ingresa un ancho válido.';
      setTimeout(() => this.closeError(), 10000);
      return;
    }

    const calculationData = {
      ancho: this.ancho,
      sentido: this.optSesgo,
      tallaBase: this.tallaInicial,
      medidas: this.medidas,
      tallas: this.tallas,
      lineaSeleccionada: this.lineaSeleccionada
    };

    this.calculatorService.calculate(calculationData).subscribe(
      (result) => {
        this.resultados = result.resultados;
        this.detallesPorTalla = result.detallesPorTalla;
        this.resultadosCalculados = this.resultados.length > 0;
        if (result.infoMessage) {
          this.infoMessage = result.infoMessage;
          setTimeout(() => this.closeInfo(), 10000);
        }
      },
      error => {
        this.errorMessage = error.message;
        setTimeout(() => this.closeError(), 10000);
      }
    );
  }

  reiniciar() {
    this.ancho = 0;
    this.medidas = [{ value: 0, escala: 0 }];
    this.medidaCount = 0;
    this.resultados = [];
    this.detalleVisible = false;
    this.detalleSeleccionado = null;
    this.errorMessage = '';
    this.resultadosCalculados = false;
  }

  mostrarDetalle(talla: string) {
    this.detalleSeleccionado = this.resultados.find((resultado) => resultado.talla === talla) || null;

    if (this.detalleSeleccionado && this.detallesPorTalla[this.detalleSeleccionado.talla]) {
      this.detalleVisible = true;
    } else {
      this.detalleVisible = false;
    }
  }

  ocultarDetalle() {
    this.detalleVisible = false;
    this.detalleSeleccionado = null;
  }

  toggleAnchoState() {
    this.updateSesgoOptions();
    if (this.optSesgo == 2) {
      this.ancho = 0;
      this.anchoDeshabilitado = true;
    } else {
      this.anchoDeshabilitado = false;
    }
  }


  validateInputs(): boolean {
    return this.medidas.every((input) => input.value > 0 && input.escala >= 0);
  }

  calcularConsumoPorTalla(ancho: number, medidas: number[]) {
    console.log(ancho, medidas)
    medidas.sort((a, b) => b - a);
    const anchos: number[] = [];
    const mpAnchos: { [key: number]: number[] } = {};
    let pos = 0;

    medidas.forEach((medida) => {
      let colocada = false;
      pos = 0;

      anchos.forEach((anchoUsado, idx) => {
        pos++;
        if (!colocada && anchoUsado + medida <= ancho) {
          anchos[idx] += medida;
          if (!mpAnchos[pos]) {
            mpAnchos[pos] = [];
          }
          mpAnchos[pos].push(medida);
          colocada = true;
        }
      });

      if (!colocada) {
        pos++;
        anchos.push(medida);
        mpAnchos[pos] = [medida];
      }
    });
    let suma = 0;
    anchos.forEach((anchoUsado) => {
      const consumo = ancho * (1.0 / Math.floor(ancho / anchoUsado));
      suma += consumo;
    });

    console.log(mpAnchos)

    return {
      consumo: suma,
      anchos,
      mpAnchos,
    };
  }


  sanitizeInput(index: number, field: 'value' | 'escala') {
    let value = this.medidas[index][field].toString().replace(',', '.');

    // Permitir solo números, puntos y comas
    const sanitizedValue = value.replace(/[^0-9.,]/g, '');

    // Convertir el valor a número flotante si es posible
    const numericValue = parseFloat(sanitizedValue);

    if (!isNaN(numericValue)) {
      this.medidas[index][field] = numericValue;
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();

    const clipboardData = event.clipboardData;
    const pastedData = clipboardData?.getData('text') || '';

    const rows = pastedData.trim().split('\n');
    rows.forEach((row, index) => {
      const [medida, escala] = row
        .split('\t')
        .map((value) => parseFloat(value.trim()));

      if (!isNaN(medida) && !isNaN(escala)) {
        if (this.medidas[index]) {
          this.medidas[index].value = medida;
          this.medidas[index].escala = escala;
        } else {
          this.medidas.push({ value: medida, escala: escala });
        }
      }
    });
  }

  replaceDotWithComma(value: string): string {
    return value.replace(',', '.');
  }

  preventInvalidCharacters(event: KeyboardEvent) {
    const char = event.key;

    if (!/[0-9.,]/.test(char) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(char)) {
      event.preventDefault();
    }
  }

  transformToUppercase(field: string) {
    if (field === 'nroMuestra') {
      this.nroMuestra = this.nroMuestra.toUpperCase();
    }
  }

}
