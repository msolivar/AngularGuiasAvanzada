export class CambiarEstadoReporteDTO {
    constructor(
        public nuevoEstado: string = '',
        public motivo: string = '',
    ) { }
}
