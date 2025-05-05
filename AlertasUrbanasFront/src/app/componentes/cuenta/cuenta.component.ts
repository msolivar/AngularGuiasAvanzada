import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../servicios/categorias.service';

interface Persona {
  nombre: string;
  edad: number;
}

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent implements OnInit {
  personas: Persona[] = [];
  editando: boolean = false;
  indiceEditando: number | null = null;

  // Formulario reactivo
  personaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ]),
    edad: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$') // Solo números enteros positivos
    ])
  });

  terminoBusqueda: string = '';
  
  constructor(private negociosService:CategoriasService){}

  ngOnInit(): void {
    // Inicialización si es necesaria
    this.personaForm.setValue({
      nombre: "karen dayana",
      edad: 21
    });

  }

  // Agrega o actualiza una persona
  guardarPersona(): void {
    if (this.personaForm.invalid) {
      this.personaForm.markAllAsTouched();
      return;
    }

    const nuevaPersona: Persona = {
      nombre: this.personaForm.value.nombre,
      edad: Number(this.personaForm.value.edad)
    };

    if (this.editando && this.indiceEditando !== null) {
      this.personas[this.indiceEditando] = nuevaPersona;
      this.editando = false;
      this.indiceEditando = null;
    } else {
      this.personas.push(nuevaPersona);
    }

    this.personaForm.reset();
  }

  // Carga la persona seleccionada en el formulario
  editarPersona(index: number): void {
    const persona = this.personas[index];
    this.personaForm.setValue({
      nombre: persona.nombre,
      edad: persona.edad
    });
    this.editando = true;
    this.indiceEditando = index;
  }

  // Elimina una persona de la lista
  eliminarPersona(index: number): void {
    this.personas.splice(index, 1);

    // Si se estaba editando esta persona, cancela la edición
    if (this.editando && this.indiceEditando === index) {
      this.personaForm.reset();
      this.editando = false;
      this.indiceEditando = null;
    }
  }

  // Filtra la lista según el término de búsqueda
  personasFiltradas(): Persona[] {
    const termino = this.terminoBusqueda.toLowerCase();
    return this.personas.filter(p =>
      p.nombre.toLowerCase().includes(termino) ||
      p.edad.toString().includes(termino)
    );
  }

  // Getters para acceder fácilmente a los controles desde la plantilla
  get nombre() {
    return this.personaForm.get('nombre');
  }

  get edad() {
    return this.personaForm.get('edad');
  }
}