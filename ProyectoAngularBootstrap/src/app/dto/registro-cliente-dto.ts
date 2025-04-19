export class RegistroClienteDTO {
    constructor(
    public cedula: string = '',
    public nombre: string = '',
    public tipo: string = '',
    public password: string = '',
    public confirmaPassword: string = '',
    ) { }
}
// Las Clases Dtos RegistroClienteDTO 
// se debe crear igual a los Dtos del backend
