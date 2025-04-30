import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CambioPasswordDTO } from '../../dto/CambioPasswordDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
// import { Alerta } from '../../dto/alerta';
// import { AlertaComponent } from '../alerta/alerta.component';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {
  tokenUrl: string = '';
  contraseniasNoCoinciden: boolean = false;
  cambioPasswordDto!: CambioPasswordDTO;
  // alerta!:Alerta;

  cambioPassword= {
    correo: '',
    nuevaContrasena: '',
    contraseniaConfirmada: ''
  };

  constructor(private route: ActivatedRoute, private authService:AuthService,private tokenService:TokenService) {
    // this.route.paramMap.subscribe(params => {
    //   this.tokenUrl = params.get('token') || '';
    // });
  }

  cambiarContrasena() {
    if (this.cambioPassword.nuevaContrasena !== this.cambioPassword.contraseniaConfirmada) {
      this.contraseniasNoCoinciden = true;
      return;
    }
    
    this.cambioPasswordDto = new CambioPasswordDTO(
      this.tokenService.getId(),
      this.cambioPassword.correo,
      this.cambioPassword.nuevaContrasena
    );

    this.authService.cambiarContraseña(this.cambioPasswordDto).subscribe({
      next: (data) => {
        console.log("Contraseña modificada correctamente");
        this.cambioPassword = {
          correo: '',
          nuevaContrasena: '',
          contraseniaConfirmada: ''
        };
      },
      error: (error) => {
        if (error.status === 400) {
          console.log('Error de conexión');
        } else {
          if (error.error && error.error.respuesta) {
            console.log(error.error.respuesta);
          } else {
            console.error('Se produjo un error, por favor verifica tus datos o intenta más tarde.');
          }
        }
      }
    });

  }
}