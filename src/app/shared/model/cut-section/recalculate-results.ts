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

export interface CorteRecalculation {
    id: number;
    nroGenerico: string;
    nroOrden: string;
    nuevoAncho: number;
    resultados: RecalculatedResult[];
    createdBy: string;
    dateCreated: Date;
}