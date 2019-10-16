import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ProductosRestApiService } from "../services/productos-rest-api.service"
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { httpError } from '../httpError';
import { ProductAPI, ProductApp } from '../models/product';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {

  producto: ProductApp;
  tituloProducto:string;
  categoriaProducto:string;
  formulario: FormGroup;
  tituloProductoControl: any;
  categoriaProductoControl: any;
  caracteresEspecialesPattern = new RegExp(/^[A-z0-9 _]*$/);
  constructor(  private productosRestApiService: ProductosRestApiService,
                private location: Location,
                private router: Router ) {

  this.formulario = new FormGroup({
    "tituloProducto": new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(this.caracteresEspecialesPattern) ]),
    "categoriaProducto": new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(this.caracteresEspecialesPattern) ])
  });

  this.tituloProductoControl = this.formulario.controls.tituloProducto;
  this.categoriaProductoControl = this.formulario.controls.categoriaProducto;

  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  createProducto() {
    if (this.formulario.valid){
      let productoNuevo = {
        title: this.formulario.get("tituloProducto").value,
        category: this.formulario.get("categoriaProducto").value,
      }
      this.producto = new ProductApp(productoNuevo);
      this.productosRestApiService.createProducto(new ProductAPI(this.producto))
        .subscribe(producto => {
          this.router.navigate(['/listado-productos']);
        }, (err: httpError)=>{
          alert(err.httpErrorMessage);
        });
    }else{
      // $event.preventDefault(); //previnir submit por defecto
      return false;
    }
  }

  resetForm() {
    this.formulario.reset();
  }
}
