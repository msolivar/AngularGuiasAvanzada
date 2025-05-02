import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/MensajeDTO';
import { RutasDeNavegacion } from './rutadenavegacion';

@Injectable({
  providedIn: 'root',
})
export class RegistroUsuarioService {
  constructor(private http: HttpClient) {}

  private apiUrl = RutasDeNavegacion.apiUrl + 'usuarios';

  public obtenerUsuario(idUsuario: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idUsuario}`);
  }

  public registrarUsuario(clienteData: RegistroClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + '/registro', clienteData);
  }
}
