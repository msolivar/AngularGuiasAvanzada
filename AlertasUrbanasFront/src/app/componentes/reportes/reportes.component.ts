import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroUsuarioService } from '../../servicios/registro-usuario.service';
import { ReporteDTO } from '../../dto/reporte-dto';
import { consultarMisReportesDTO } from '../../dto/consultar-mis-reporte-dto';
import { ReporteService } from '../../servicios/reporte.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule], // Habilitar ngModel
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  //Inicializar Clase
  reporteDTO = new ReporteDTO();

  //Lista Categorias 
  misReportes: consultarMisReportesDTO[];

  //Lista Categorias 
  categorias: { id: string, nombre: string }[] = [];

  // Archivos
  archivos!: FileList;

  terminoBusqueda: string = '';

  salidaTexto: string = '';

  imagenSubidas: string[];

  //Filtro
  filtroNombre: FormControl = new FormControl('');
  reportesFiltrados: consultarMisReportesDTO[] = [];

  loginForm: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(7)]),
    categoria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(7)]),
    imagen: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,
    private registroService: RegistroUsuarioService,
    private reporteService: ReporteService,
    private categoriasService: CategoriasService,
    private tokenService: TokenService) {

    this.reporteDTO = new ReporteDTO();
    this.categorias = [];
    this.cargarCategoria();
    this.cargarEmail();
    this.imagenSubidas = [];
    this.getMisReporte();
    this.misReportes = [];
  }

  ngOnInit(): void {
    this.filtroNombre.valueChanges.subscribe(valor => {
      this.filtrarReportes(valor);
    });
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      console.log(files);

      this.archivos = event.target.files;
      this.imagenSubidas.push(this.archivos[0].name);
      this.reporteDTO.rutaImagenes = this.imagenSubidas;
    }
  }

  public registrar() {

    const fechaActual: string = new Date().toISOString();

    this.reporteDTO.titulo = this.loginForm.get('titulo')?.value;
    this.reporteDTO.categoria = this.loginForm.get('categoria')?.value;
    this.reporteDTO.descripcion = this.loginForm.get('descripcion')?.value;
    this.reporteDTO.fechaCreacion = fechaActual;
    this.reporteDTO.estado = 'PENDIENTE';

    console.log(this.reporteDTO);

    // delete this.registroClienteDTO.confirmaPassword;

    this.reporteService.crearReporte(this.reporteDTO).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));

        if (data) {
          alert('Reporte registrado Revise en su badeja de entrada,\nsi su correo existe se le ha enviado un correo con el link de recuperación');
          this.router.navigate(['/reportes']);
        }

      },
      error: (error) => {
        console.error(JSON.stringify(error));

        if (error.status === 500) {
          alert(error.error.data);
        } else {
          if (error.error && error.error.mensaje) {
            console.log(error.error.data);
          } else {
            console.log('Se produjo un error, por favor verifica tus datos o intenta más tarde.');
          }
        }
      },
    });
  }

  cargarCategoria(): void {

    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data.data;

        console.log("Categorias encontradas: ", JSON.stringify(data));
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
      }
    })
  }

  public cargarEmail() {

    let idUsuario = this.tokenService.getEmail();

    this.registroService.obtenerUsuario(idUsuario).subscribe({
      next: (data) => {
        console.log("Usuario encontrado: ", JSON.stringify(data));

        if (data) {
          const r = data.data;

          this.reporteDTO.idUsuario = r.id;

        } else {
          console.error('No se encontró el usuario.');
        }
      },
      error: (error) => {

        if (error.status === 404) {
          this.salidaTexto = 'Usuario no encontrado.';
        } else if (error.status === 403) {
          this.salidaTexto = 'Usuario no autentificado';
        } else {
          this.salidaTexto = 'Error al obtener la información.';
        }

        // console.error(JSON.stringify(error));
      },
    });
  }

  public getMisReporte() {
    this.reporteService.consultarMisReportes().subscribe({
      next: (data) => {
        // console.log("Mis Reportes",JSON.stringify(data));

        if (data) {
          this.misReportes = data;
          this.reportesFiltrados = [...this.misReportes];

          console.log("Asignar mis reportes", this.misReportes);

          // this.salidaTexto = Nombre: ${r.nombre}, Email: ${r.email}, ciudad: ${r.ciudad}
          // Telefono: ${r.telefono}, Direccion: ${r.direccion};
        } else {
          this.salidaTexto = 'No se encontró el usuario.';
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

  public filtrarReportes(valor: string): void {
    const filtro = valor.toLowerCase();
    this.reportesFiltrados = this.misReportes.filter(reporte =>
      reporte.nombre.toLowerCase().includes(filtro)
    );
  }

}