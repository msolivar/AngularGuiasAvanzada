import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [
    { path: 'registro', component: RegistroComponent }, 
    { path: "**", pathMatch: "full", redirectTo: "" }
];