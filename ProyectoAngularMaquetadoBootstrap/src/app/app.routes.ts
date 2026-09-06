import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
// import { LoginComponent } from './componentes/login/login.component';
// import { RegistroComponent } from './componentes/registro/registro.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { DetalleEventoComponent } from './componentes/detalle-evento/detalle-evento.component';

export const routes: Routes = [
    { path: '', component: InicioComponent }, //Se carga el componente de inicio al entrar a la aplicación
//  { path: 'login', component: LoginComponent },
//  { path: 'registro', component: RegistroComponent },
    { path: "gestion-eventos", component: GestionEventosComponent },
    { path: 'detalle-evento/:id', component: DetalleEventoComponent },
    { path: "**", pathMatch: "full", redirectTo: "" }
];
