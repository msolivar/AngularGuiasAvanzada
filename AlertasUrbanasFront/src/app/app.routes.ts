import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RecuperarCuentaComponent } from './componentes/recuperar-cuenta/recuperar-cuenta.component';
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { ReportesComponent }  from './componentes/reportes/reportes.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar-cuenta', component: RecuperarCuentaComponent },
  { path: 'cambiar-contrasena/:token', component: CambiarContrasenaComponent },

  //categoria
  { path: 'categoria', component: CategoriaComponent },
  
  //cuenta
  { path: 'cuenta', component: CuentaComponent },

  //reportes
  { path: 'reportes', component: ReportesComponent },

  //Ruta Global
  { path: '**', pathMatch: 'full', redirectTo: '' },
  
];
