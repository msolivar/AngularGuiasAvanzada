import { Component } from '@angular/core';
import { 
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroUsuarioService } from '../../servicios/registro-usuario.service';
import { ReporteDTO } from '../../dto/reporte-dto';
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
export class  ReportesComponent {
  //Inicializar Clase
  reporteDTO = new ReporteDTO();

  //Lista Categorias 
  categorias: { id: string, nombre: string }[] = [];

  // Archivos
  archivos!:FileList;

  loginForm: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(7)]),
    categoria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(7)]),
    imagen: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,
    private categoriasService: CategoriasService, 
    private RegistroService: RegistroUsuarioService,
    private tokenService:TokenService) {

    this.reporteDTO = new ReporteDTO();
    this.categorias = [];
    this.cargarCategoria();
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
    const files = event.target.files;
    console.log(files);

    this.archivos = event.target.files;
    this.reporteDTO.imagenes = this.archivos[0].name;
    }
  }

  public registrar() {

    const fechaCreacion: string = new Date().toISOString();

    this.reporteDTO.titulo = this.loginForm.get('titulo')?.value;
    this.reporteDTO.categoria = this.loginForm.get('categoria')?.value;
    this.reporteDTO.descripcion = this.loginForm.get('descripcion')?.value;
    this.reporteDTO.horarios = fechaCreacion;
    this.reporteDTO.idUsuario = this.tokenService.getEmail();
    this.reporteDTO.estado = 'PENDIENTE';
    
    console.log(this.reporteDTO);
    
    // delete this.registroClienteDTO.confirmaPassword;
    // console.log(this.registroClienteDTO);
    // this.RegistroService.registrarUsuario(this.registroClienteDTO).subscribe({
    //   next: (data) => {
    //     console.log(JSON.stringify(data));

    //     if (data) {
    //       alert('Cliente registrado Revise en su badeja de entrada,\nsi su correo existe se le ha enviado un correo con el link de recuperación');
    //       this.router.navigate(['/']);
    //     }
        
    //   },
    //   error: (error) => {
    //     console.error(JSON.stringify(error));

    //     if (error.status === 500) {
    //       alert(error.error.data);
    //     } else {
    //       if (error.error && error.error.mensaje) {
    //         console.log(error.error.data);
    //       } else {
    //         console.log('Se produjo un error, por favor verifica tus datos o intenta más tarde.');
    //       }
    //     }
    //   },
    // });
  }

  cargarCategoria(): void {

    this.categoriasService.obtenerCategorias().subscribe({
      next:(data) => {
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
}

