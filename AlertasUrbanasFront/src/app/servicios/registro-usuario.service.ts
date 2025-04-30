import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/MensajeDTO';
import { RutasDeNavegacion } from './rutadenavegacion';

@Injectable({
  providedIn: 'root'
})

export class RegistroUsuarioService {
  
  constructor(private http: HttpClient) { }

  private apiUrl = RutasDeNavegacion.apiUrl+"/usuarios";

  public obtenerUsuario(idUsuario: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/${idUsuario}`);
  }
}
