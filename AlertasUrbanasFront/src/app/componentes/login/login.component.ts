import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../servicios/login.service';
import { TokenService } from '../../servicios/token.service';
import { AuthService } from '../../servicios/auth.service';
// import { Alerta } from '../../dto/alerta';
import { LoginDTO } from '../../dto/LoginDTO';
import { RouterModule } from '@angular/router';
// import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // alerta!: Alerta;
  loginDTO: LoginDTO;

  loginForm: FormGroup = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.loginDTO = new LoginDTO();
  }

  public login() {

    // this.loginDTO.email = "admin@reportes.com";
    // this.loginDTO.password = "123456789";

    this.loginDTO.email = this.loginForm.get('correo')?.value;
    this.loginDTO.password = this.loginForm.get('password')?.value;
    console.log('this login', this.loginDTO);
    
    this.authService.loginCliente(this.loginDTO).subscribe({
      next: (data) => {
        // console.log("data: "+JSON.stringify(data));
        this.tokenService.login(data.token);
      },
      error: (error) => {
        
        // console.log(JSON.stringify(error));
        
        if (error.status === 400) {

          console.log('Error de conexión');
          
        } else {
          if (error.error && error.error.mensaje) {
            console.log(error.error.data);
          } else {
            console.log('Se produjo un error, por favor verifica tus datos o intenta más tarde.');
          }
        }
      }
    });
  }

}