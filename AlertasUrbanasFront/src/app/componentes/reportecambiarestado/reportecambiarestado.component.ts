import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ReporteDTO } from '../../dto/reporte-dto';
import { CambiarEstadoReporteDTO } from '../../dto/cambiar-estado-reporte-dto';
import { ReporteService } from '../../servicios/reporte.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-reportecambiarestado',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reportecambiarestado.component.html',
  styleUrl: './reportecambiarestado.component.css'
})
export class ReportecambiarestadoComponent {

  idreporte: string = '';
  ComentarioDTO = new CambiarEstadoReporteDTO();

  categorias: any[] = []; // Lista que llenaremos como array

  mostrarBotonAgregar: boolean = true;
  terminoBusqueda: string = '';

  categoriaSeleccionada: CambiarEstadoReporteDTO = { 
    nuevoEstado: '', 
    motivo: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriasService: ReporteService,
    private tokenService: TokenService
  ) {
    this.route.paramMap.subscribe(params => {
      this.idreporte = params.get('idreporteEstado') || '';
      this.getCategorias();
    });
  }

  //Limpiar Campos
  // limpiarCampos(){
  //   this.ComentarioDTO.comentarioTexto = ""; 
  //   this.ComentarioDTO.fecha = ""; 
  // }

  //Crear*
  agregarComentario(){

    console.log('Agregar comentario - por implementar');

    this.ComentarioDTO.motivo = this.categoriaSeleccionada.motivo;

    console.log(JSON.stringify(this.ComentarioDTO));
    

    // this.categoriasService.cambiarEstadoDelReporte(this.ComentarioDTO,this.idreporte).subscribe({
    //   next: (data) => {
    //     console.log('Estado Actualizado', JSON.stringify(data));
        
    //     this.getCategorias();
    //     // this.router.navigate(["/categoria"]).then(() => {
    //     //   window.location.reload();
    //     // });
    //   },
    //   error: (error) => {
    //     console.error(JSON.stringify(error));

    //     if (error.status === 500) {
    //       console.error('Error en el servidor');
    //     } else {
    //       if (error.error && error.error.mensaje) {
    //         console.log(error.error.mensaje);
    //       } else {
    //         console.log('Se produjo un error, por favor verifica tus datos o intenta más tarde.');
    //       }
    //     }
    //   },
    // });
    
  }

  public getCategorias(): void {
    this.categoriasService.obtenerReporte(this.idreporte).subscribe({
      next: (data) => {
        // Convertimos el objeto en arreglo para que *ngFor funcione
        this.categorias = [data];
        console.log("Reporte encontrado: ", data);
      },
      error: (error) => {
        console.error(error);
        if (error.status === 500) {
          console.error('Error en el servidor');
        } else if (error.error?.mensaje) {
          console.log(error.error.mensaje);
        } else {
          console.log('Se produjo un error, por favor verifica tus datos o intenta más tarde.');
        }
      }
    });
  }

}
