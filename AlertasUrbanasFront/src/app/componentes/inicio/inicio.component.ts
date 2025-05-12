import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { consultarMisReportesDTO } from '../../dto/consultar-mis-reporte-dto';
import { ReporteService } from '../../servicios/reporte.service';

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  paginacion: string = '';
  //Lista Reportes 
  misReportes: consultarMisReportesDTO[];

  salidaTexto: string = 'https://www.educapeques.com/wp-content/uploads/2013/01/vida-en-el-campo.jpg.webp';

  paginas = [
    { numero: 1, offset: 10 },
    { numero: 2, offset: 20 },
    { numero: 3, offset: 30 },
    { numero: 4, offset: 40 },
    { numero: 5, offset: 50 },
    { numero: 6, offset: 60 },
  ];

  anteriorOffset = 0;  // o calcula dinámicamente según la página actual
  siguienteOffset = 70;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reporteService: ReporteService) {

    this.getMisReporte();
    this.misReportes = [];

    this.route.paramMap.subscribe(params => {
      this.paginacion = params.get('pagina') || '';
    });
  }

  public getMisReporte() {
    this.reporteService.obtenerReportes(this.paginacion).subscribe({
      next: (data) => {
        console.log("Mis Reportes", JSON.stringify(data[0].rutaImagenes));

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
