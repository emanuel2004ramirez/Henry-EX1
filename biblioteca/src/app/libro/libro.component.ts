import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Libro {
  id: number;
  titulo: string; 
  autor: string;
}

@Component({
  imports: [],
  selector: 'app-libro',
  styleUrl: './libro.component.css',
  templateUrl: './libro.component.html',
})
export class LibroComponent {
  //Inicalizar todo
  constructor(private router: Router) {}
  libros: Libro[] = [];
  indiceEditar = -1;


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









  //Cerrar sesion
  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
    
  }
}
