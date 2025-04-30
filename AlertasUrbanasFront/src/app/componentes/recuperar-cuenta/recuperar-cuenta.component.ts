import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { LoginService } from '../../servicios/login.service';
// import { Alerta } from '../../dto/alerta';
// import { AlertaComponent } from '../alerta/alerta.component';
import { AuthService } from '../../servicios/auth.service';
import { RecuperarCuentaDTO } from '../../dto/RecuperarCuentaDTO';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
 standalone: true,
 imports: [FormsModule],
  styleUrls: ['./recuperar-cuenta.component.css']
})
export class RecuperarCuentaComponent {
  email: string = '';
  // alerta!:Alerta;
  recuperarDTO: RecuperarCuentaDTO;

  constructor(private authService: AuthService ) { 
    this.recuperarDTO = new RecuperarCuentaDTO();
  }

  recuperarContrasena() {
    // Lógica para enviar el correo electrónico y recuperar la contraseña
    this.recuperarDTO.email = this.email; 

    console.log('Enviando correo electrónico a:', JSON.stringify(this.recuperarDTO));
    
    this.authService.enviarLinkRecuperacionPass(this.recuperarDTO).subscribe({
      next: (data) => {
        console.log('Revise en su badeja de entrada, si su correo existe se le ha enviado un correo con el link de recuperación');
      },
      error: (error) => {
        // console.error(JSON.stringify(error));
        
        if (error.status === 500) {
          console.error('Error de conexión');
        } else {
          if (error.error && error.error.mensaje) {
            console.error("sorry: "+error.error.data[0].mensaje);
          } else {
            console.error('Se produjo un error, por favor verifica tus datos o intenta más tarde.');
          }
        }
      }
    });
  }
}