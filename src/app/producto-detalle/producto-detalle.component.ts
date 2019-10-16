import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { ProductosRestApiService } from "../services/productos-rest-api.service";
import { Router } from '@angular/router';
import { SlugToWordPipe } from '../pipes/slug-to-word.pipe';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { httpErrorCode, httpError } from '../httpError';
import { ProductApp, ProductAPI } from '../models/product';
@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: ProductApp;
  formulario: FormGroup;
  loader: boolean = true;
  httpErrorCode: number;
  httpErrorMessage: string;
  tituloProductoControl: any;
  caracteresEspecialesPattern = new RegExp(/^[A-z0-9 _]*$/);
  constructor(  private route: ActivatedRoute,
                private productosRestApiService: ProductosRestApiService,
                private location: Location,
                private router: Router ) { 
                    
  }

  ngOnInit() {
    this.getProductoPorSlug()
  }

  getProductoPorSlug(){
    let slug: string = "";
    let slugToWord = new SlugToWordPipe();
    this.route.params.subscribe(params => slug = params["slug"]);
    this.productosRestApiService.getProductoPorSlug(slugToWord.transform(slug))
        .subscribe((producto:ProductApp) => {
            this.loader = false;
            this.producto = producto;
            this.formulario = new FormGroup({
              "tituloProducto": new FormControl(
                this.producto.titulo,
                [ Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(this.caracteresEspecialesPattern) ])
            });
            this.tituloProductoControl = this.formulario.controls.tituloProducto;
          },
          (err: httpError) => {
            this.loader = false;
            this.httpErrorCode = err.httpStatusCode;
            this.httpErrorMessage = err.httpErrorMessage;
          });
  }

  deleteProductoPorId(id:number){
    if (window.confirm('Are you sure, you want to delete?')) {
        this.productosRestApiService.deleteProductoPorId(id)
            .subscribe(data => {
                this.router.navigate(['/listado-productos']);
        })
    }
  }

  updateProducto() {
    if (this.formulario.valid) {
      if (window.confirm('Are you sure, you want to update?')) {
          this.producto.titulo = this.tituloProductoControl.value;
          this.productosRestApiService.updateProductoPorId(new ProductAPI(this.producto))
              .subscribe(data => {
                  this.router.navigate(['/listado-productos']);
          })
        }
    }
  }

  goBack(): void {
    this.location.back();
  }

}
