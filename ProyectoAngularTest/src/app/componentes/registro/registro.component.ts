import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
// Habilitar ngModel

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule], // Habilitar ngModel
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {

  // Instanciar Clase
  registroClienteDTO: RegistroClienteDTO;
  
  // Lista de ciudades
  ciudades: string[];

  // Archivos
  archivos!:FileList;

  constructor() {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.ciudades = [];
    this.cargarCiudades(); // Llamado para llenar las ciudades
  }

  public registrar() {
    // console.log(this.registroClienteDTO);
    //Usuario debe Agregar Foto
    if (this.registroClienteDTO.fotoPerfil != "") {
      console.log(this.registroClienteDTO);
      } else {
      console.log("Debe cargar una foto");
    }
  }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  }

  private cargarCiudades() {
    this.ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
    const files = event.target.files;
    console.log(files);

    this.archivos = event.target.files;
    this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }

}
