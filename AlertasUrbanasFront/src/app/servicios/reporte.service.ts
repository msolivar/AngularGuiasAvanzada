import { Injectable } from '@angular/core';
import { ReporteDTO } from '../dto/reporte-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/MensajeDTO';
import { RutasDeNavegacion } from './rutadenavegacion';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private authURL = RutasDeNavegacion.apiUrl+"reportes";

  constructor(private http: HttpClient) { }

  public crearReporte(ReporteNuevo: ReporteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}`, ReporteNuevo);
  }

  public actualizarReporte(actualizarReporte: ReporteDTO, 
    codigoReporte: string | undefined): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/${codigoReporte}`, actualizarReporte);
  }

  public actualizarEstado(actualizarReporte: ReporteDTO, 
    codigoReporte: string | undefined): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/${codigoReporte}/estado`, actualizarReporte);
  }

  public obtener(codigoReporte: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/${codigoReporte}`);
  }

  public eliminarReporte(codigoReporte: string | undefined): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.authURL}/${codigoReporte}`);
  }

  public obtenerReportes(): Observable<any> {
    return this.http.get<any>(`${this.authURL}`);
  }

  public reporteImportante(ReporteNuevo: ReporteDTO, 
    codigoReporte: string | undefined): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/${codigoReporte}/importante`, ReporteNuevo);
  }

  public calificarReporte(ReporteNuevo: ReporteDTO, 
    codigoReporte: string | undefined): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/${codigoReporte}/calificacion`, ReporteNuevo);
  }

  public reportesCercanos(ReporteNuevo: ReporteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/cercanos`, ReporteNuevo);
  }

  public misReportes(): Observable<any> {
    return this.http.get<any>(`${this.authURL}`);
  }

  //Parametros
  public imformeDeReportes(): Observable<any> {
    return this.http.get<any>(`${this.authURL}`);
  }

  public filtrados(): Observable<any> {
    return this.http.get<any>(`${this.authURL}`);
  }

  public buscar(): Observable<any> {
    return this.http.get<any>(`${this.authURL}`);
  }

}
