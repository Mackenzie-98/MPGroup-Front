export interface DetallePorTalla {
    talla: string;
    consumo: number;
    anchos: number[];
    mpAnchos: { [key: number]: number[] };
}
