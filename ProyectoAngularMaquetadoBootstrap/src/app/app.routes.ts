import { Routes } from '@angular/router';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { DetalleEventoComponent } from './componentes/detalle-evento/detalle-evento.component';

export const routes: Routes = [
    { path: "gestion-eventos", component: GestionEventosComponent },
    { path: 'detalle-evento/:id', component: DetalleEventoComponent },
    { path: "**", pathMatch: "full", redirectTo: "" }
];
