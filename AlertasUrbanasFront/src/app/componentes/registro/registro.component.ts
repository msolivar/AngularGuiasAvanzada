import { Component } from '@angular/core';
import { 
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroUsuarioService } from '../../servicios/registro-usuario.service';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule], // Habilitar ngModel
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  // Instanciar Clase
  registroClienteDTO: RegistroClienteDTO;

  // Lista de ciudades
  ciudades: string[];

  salidaTexto = '';

  // Para alternar visibilidad
  mostrarPassword: boolean = false; 

  loginForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(7)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(7)]),
    ciudad: new FormControl('', [Validators.required, Validators.minLength(7)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]),
    confirmaPassword: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]) 
  });

  constructor(private RegistroService: RegistroUsuarioService) {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.ciudades = [];
    this.cargarCiudades(); // Llamado para llenar las ciudades
  }

  public obtenerInformacion(idUsuario: string) {
    this.RegistroService.obtenerUsuario(idUsuario).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        
        if (data) {
          const r = data;
          this.salidaTexto = `
          Nombre: ${r.nombre}, Email: ${r.email}, ciudad: ${r.ciudad}
          Telefono: ${r.telefono}, Direccion: ${r.direccion}`;
        } else {
          this.salidaTexto = 'No se encontró el usuario.';
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

  public registrar() {

    this.registroClienteDTO.nombre = this.loginForm.get('nombre')?.value;
    this.registroClienteDTO.telefono = this.loginForm.get('telefono')?.value;
    this.registroClienteDTO.ciudad = this.loginForm.get('ciudad')?.value;
    this.registroClienteDTO.direccion = this.loginForm.get('direccion')?.value;
    this.registroClienteDTO.email = this.loginForm.get('email')?.value;
    this.registroClienteDTO.password = this.loginForm.get('password')?.value;
    
    delete this.registroClienteDTO.confirmaPassword;
    // console.log(this.registroClienteDTO);
    this.RegistroService.registrarUsuario(this.registroClienteDTO).subscribe({
      next: (data) => {
        console.log('Cliente registrado Revise en su badeja de entrada, si su correo existe se le ha enviado un correo con el link de recuperación');
      },
      error: (error) => {
        console.error(JSON.stringify(error));

        if (error.status === 500) {
          console.error('Error en el servidor');
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

  public sonIguales(): boolean {
    const password = this.loginForm.get('password')?.value;
    const confirmar = this.loginForm.get('confirmaPassword')?.value;
  
    return (
      password?.trim() !== '' &&
      confirmar?.trim() !== '' &&
      password === confirmar
    );
  }

  private cargarCiudades() {
    this.ciudades = ['CALI', 'MEDELLIN', 'ARMENIA', 'MANIZALES', 'PEREIRA', 'BOGOTA'];
  }
}
