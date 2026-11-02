import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Libro {
  id: number;
  titulo: string; 
  autor: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-libro',
  styleUrl: './libro.component.css',
  templateUrl: './libro.component.html',
})
export class LibroComponent {
  //Inicalizar todo
  constructor(private router: Router) {}
  libros: Libro[] = [];
  indiceEditar = -1;
  autor: string = '';
  titulo: string = '';


  //Cragar ddatos iniciales
ngOnInit() {
  if(localStorage.getItem('sesionBiblioteca') === null){
    this.router.navigate(['/login']);
    alert('Debes iniciar sesión para acceder a esta página.');
  }
  else{
    this.leer();
    }
  }

//READ
leer(){
  const librosGuardados = localStorage.getItem('libros');
    if (librosGuardados) {
      this.libros = JSON.parse(librosGuardados);
}
}
//CREATE
crear() {
  if (this.autor.trim() === '' || this.titulo.trim() === '') {
    alert('Por favor, complete todos los campos.');
    return;
  }

  //Gnerar ID
  const id = this.libros.length + 1;

  if(this.indiceEditar === -1){
    //Insertar
    this.libros.push({
      id: id,
      autor: this.autor,
      titulo: this.titulo
    })

  }else{
    //Editar

  }
  this.guardarLocal();
  this.limpiar();


}




//Guardar en localStorage
guardarLocal() {
  localStorage.setItem('libros', JSON.stringify(this.libros));
  alert('Libro guardado correctamente.');
}

  //Limpiar
  limpiar() {
    this.indiceEditar = -1;
    this.autor = '';
    this.titulo = '';
  }


  //Cerrar sesion
  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
    
  }
}
