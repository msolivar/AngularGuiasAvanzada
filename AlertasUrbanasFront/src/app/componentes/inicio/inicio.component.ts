import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { consultarMisReportesDTO } from '../../dto/consultar-mis-reporte-dto';
import { ReporteService } from '../../servicios/reporte.service';


@Component({
  selector: 'app-inicio',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  //Lista Reportes 
  misReportes: consultarMisReportesDTO[];

  salidaTexto: string = '';

  constructor(private router: Router,
    private reporteService: ReporteService){

    this.getMisReporte();
    this.misReportes = [];
  }

  public getMisReporte() {
    this.reporteService.obtenerReportes(10).subscribe({
      next: (data) => {
        console.log("Mis Reportes",JSON.stringify(data));

        if (data) {
          this.misReportes = data;
          // this.reportesFiltrados = [...this.misReportes];

          console.log("Reportes Encontrados", this.misReportes);

        } else {
          this.salidaTexto = 'No se encontró el reporte';
        }
      },
      error: (error) => {
        console.error(JSON.stringify(error));

        if (error.status === 500) {
          console.error('Error en el servidor');
        } else {
          if (error.error && error.error.mensaje) {
            console.log(error.error.mensaje);
          } else {
            console.log('Se produjo un error, por favor verifica tus datos o intenta más tarde.');
          }
        }
      },
    });
  }
}
