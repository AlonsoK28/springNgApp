import { Component, OnInit } from '@angular/core';
import { ProductosRestApiService } from "../services/productos-rest-api.service";
import { Producto } from "../producto";
@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
    loader: boolean = true;
    sinResultados: boolean = false;
    Productos: any = [];
    hayError: boolean = false;
    errorMensaje: string;
    constructor(private productosRestApi: ProductosRestApiService) { }

    ngOnInit() {
        this.getListadoProductos();
    }

    getListadoProductos(){
      return this.productosRestApi
                .getListadoProductos()
                    .subscribe((data:Producto[]) =>{
                        this.Productos = data;
                        //sin resultados
                        if (this.Productos.length === 0) {
                            this.loader = false;
                            this.sinResultados = true;
                            return;
                        }
                        this.loader = false;
                    }, (err) =>{
                        this.hayError = true;
                        this.errorMensaje = err;
                    });
    }
}
