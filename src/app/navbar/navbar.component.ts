import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordToSlugPipe } from "../pipes/word-to-slug.pipe";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  buscarProductos(termino: string){
    if(termino.trim().length == 0){
      return;
    }
    let wordToSlug = new WordToSlugPipe();
    this.router.navigate([`busqueda/`, wordToSlug.transform(termino)]);
  }
}
