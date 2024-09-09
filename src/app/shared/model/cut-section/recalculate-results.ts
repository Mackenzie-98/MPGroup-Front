export interface Detalle {
    talla: string;
    consumo: number;
}

export interface RecalculatedResult {
    sentido: string;
    sesgo: number;
    detalles: Detalle[];
}

export interface RecalculationResponse {
    success: boolean;
    message: string;
    recalculatedResults: RecalculatedResult[];
}
