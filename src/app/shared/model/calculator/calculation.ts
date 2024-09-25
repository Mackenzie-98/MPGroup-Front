export interface Calculation {
    id: number;
    nroMuestra: string;
    nroGenerico?: string;
    ancho: number;
    sentido: number;
    linea: string;
    tallaBase: number;
    sesgo: number;
    medidas: { value: number; escala: number }[];
    resultados: { label: string; value: string; talla: string }[];
    detalles: {
        [key: string]: {
            consumo: number;
            anchos: number[];
            mpAnchos: { [key: number]: number[] };
        };
    };
    tallas: { key: string; value: number }[];
    dateCreated: Date;
    createdBy: string;
}
