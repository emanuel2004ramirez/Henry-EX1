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
  const id = this.libros.length > 0 ? this.libros[this.libros.length - 1].id + 1 : 1;

  if(this.indiceEditar === -1){
    //Insertar
    this.libros.push({
      id: id,
      autor: this.autor,
      titulo: this.titulo
    })

  }else{
    //Editar
    this.libros[this.indiceEditar].autor = this.autor;
    this.libros[this.indiceEditar].titulo = this.titulo;

  }
  this.guardarLocal();
  this.limpiar();


}

//UPDATE
actualizar(indice: number) {
  this.indiceEditar = indice;
  this.autor = this.libros[indice].autor;
  this.titulo = this.libros[indice].titulo;
}

//DELETE
eliminar(indice: number) {
  if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
    this.libros.splice(indice, 1);
    this.guardarLocal();
  }
}




//Guardar en localStorage
guardarLocal() {
  localStorage.setItem('libros', JSON.stringify(this.libros));
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
