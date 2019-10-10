import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { Producto, ProductoNuevo } from "../producto"
import { ProductosRestApiService } from "../services/productos-rest-api.service";
import { Router } from '@angular/router';
import { SlugToWordPipe } from '../pipes/slug-to-word.pipe';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  producto: Producto;
  loader: boolean = true;
  hayError: boolean = false;
  errorMensaje: string;
  sinResultados: boolean = false;
  formulario: FormGroup;
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
        .subscribe((producto) => {
                    this.producto = producto;
                    if (!this.producto ){
                      this.sinResultados = true;
                    }
                    this.loader = false;
                    this.formulario = new FormGroup({
                      "tituloProducto": new FormControl(
                        producto.titulo, 
                        [
                          Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(50),
                          Validators.pattern('[a-zA-Z ]*')
                        ]
                      )
                    });
                  },
                  (err) => {
                    this.hayError = true;
                    this.errorMensaje = err;
                  });
  }
  getProductoPorId(){
      const id = +this.route.snapshot.paramMap.get("id");
      this.productosRestApiService.getProductoPorId(id)
          .subscribe((producto) => {
                      this.loader = false;
                      this.producto = producto;
                    },
                    (err) => {
                      this.hayError = true;
                      this.errorMensaje = err;
                    });
  }

  deleteProductoPorId(id:Number){
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
          this.producto.titulo = this.formulario.controls["tituloProducto"].value;
          this.productosRestApiService.updateProductoPorId(new ProductoNuevo(this.producto))
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
