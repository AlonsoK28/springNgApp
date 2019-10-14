export interface httpError {
    httpErrorMessage?: string;
    httpStatusCode: number;
}

export const httpErrorCode = {
    0: {
        code: 0,
        message: 'No hay conexión con el proveedor del servicio'
    },
    404: {
        code: 404,
        message: 'El producto no fue encontrado'
    },
    409: {
        code: 409,
        message: 'Este producto ya fue registrado'
    },
    500: {
        code: 500,
        message: 'Error interno del servidor'
    },
    
}