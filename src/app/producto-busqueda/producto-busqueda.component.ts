import { Component, OnInit } from '@angular/core';
import { ProductosRestApiService } from '../services/productos-rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { SlugToWordPipe } from "../pipes/slug-to-word.pipe";
import { httpError } from '../httpError';
import { ProductApp } from '../models/product';


@Component({
  selector: 'app-producto-busqueda',
  templateUrl: './producto-busqueda.component.html',
  styleUrls: ['./producto-busqueda.component.css']
})
export class ProductoBusquedaComponent implements OnInit {
  Productos: ProductApp[] = [];
  sinResultados: boolean;
  busquedaInicial: boolean = true;
  termino: string = ""; 
  loader: boolean;
  httpErrorCode:number;
  httpErrorMessage:string;

  constructor(private productosRestApi: ProductosRestApiService,
              private route: ActivatedRoute) { 

    this.route.params.subscribe( params => {
      if(params["termino"]){
         this.termino = params["termino"];
         this.buscarProductos();
      }
    });

  }

  ngOnInit() {
    //si la busqueda viene desde el navbar debes establecer la variable busquedaInicial = false
  }

  buscarProductos(){
    if(this.termino.length == 0){
      return;
    }
    this.busquedaInicial = false;
    this.loader = true;
    this.sinResultados = false;
    this.getListadoProductosBusqueda();  
  }

  getListadoProductosBusqueda() {
    let slugToWord = new SlugToWordPipe();
    return this.productosRestApi
      .getListadoProductosBusqueda(slugToWord.transform(this.termino))
               .subscribe(
                // on next
                (data:ProductApp[]) => {
                  this.Productos = data;
                  //sin resultados
                  this.loader = false;
                  if (this.Productos.length === 0) {
                    this.sinResultados = true;
                    return;
                  }
               },
               // on error 
               (err: httpError) => {
                   this.loader = false;
                   this.httpErrorCode = err.httpStatusCode;
                   this.httpErrorMessage = err.httpErrorMessage;
               }, 
               // on complete
               () => console.info("complete: getListadoProductosBusqueda"));
  }

}
