import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule], // Agregar RouterModule para que funcione routerLink
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Alerta Urbana';

  isLogged = false;

  email: string = '';
  constructor(private tokenService: TokenService) {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
    }
  }
  public logout() {
    this.tokenService.logout();
  }
}
