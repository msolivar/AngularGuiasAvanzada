import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RecuperarCuentaComponent } from './componentes/recuperar-cuenta/recuperar-cuenta.component';
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { ReportesComponent }  from './componentes/reportes/reportes.component';
import { ReportecambiarestadoComponent }  from './componentes/reportecambiarestado/reportecambiarestado.component';
import { ComentariosComponent }  from './componentes/comentarios/comentarios.component';


export const routes: Routes = [
  { path: 'inicio/:pagina', component: InicioComponent },
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

  //reporte cambiar Estado
  { path: 'reporte-cambiar-estado/:idreporteEstado', component: ReportecambiarestadoComponent },

  //comentario
  { path: 'comentarios/:idreporte', component: ComentariosComponent },

  //Ruta Global
  { path: '**', pathMatch: 'full', redirectTo: 'inicio/10' },
  
];
