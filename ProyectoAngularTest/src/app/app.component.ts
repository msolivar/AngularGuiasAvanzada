import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; //href
import { RouterModule } from '@angular/router'; // Importar RouterModule

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoAngularTest';
  footer = 'Universidad del Quindío - 2025-2';
}
