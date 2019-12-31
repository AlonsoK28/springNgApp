import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WordToSlugPipe } from "../pipes/word-to-slug.pipe";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document, private router: Router ) { }

  ngOnInit() {
  }

  buscarProductos(termino: string){
    if(termino.trim().length == 0){
      return;
    }
    let wordToSlug = new WordToSlugPipe();
    this.router.navigate([`busqueda/`, wordToSlug.transform(termino)]);
  }

  switchTheme() {
    const $theme = this._document.getElementById("theme");
    const $switch = this._document.getElementById("customSwitch1");
    const $label = this._document.getElementById("customSwitch1label");
    const url = "assets/bootstrap";
    if (!$switch.checked){
      $label.innerHTML = "Tema Obscuro 🌙";
      $theme.setAttribute("href", `${url}/clear-bootstrap.min.css`);
    }else{
      $label.innerHTML = "Tema Claro 🌞";
      $theme.setAttribute("href", `${url}/dark-bootstrap.min.css`);
    }
  }

}
