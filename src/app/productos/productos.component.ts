import { Component, OnInit } from '@angular/core';
import { ProductosRestApiService } from "../services/productos-rest-api.service";
import { Producto } from "../producto";
import { httpError } from '../httpError';
@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
    sinResultados: boolean = false;
    Productos: any = [];
    loader: boolean = true;
    httpErrorCode: number;
    httpErrorMessage: string;
    constructor(private productosRestApi: ProductosRestApiService) { }

    ngOnInit() {
        this.getListadoProductos();
    }

    getListadoProductos(){
      return this.productosRestApi
                .getListadoProductos()
                    .subscribe((data:Producto[]) =>{
                        this.Productos = data;
                        console.log("Productos producto component: ", JSON.stringify(this.Productos));
                        //sin resultados
                        this.loader = false;
                        if (this.Productos.length === 0) {
                            this.sinResultados = true;
                            return;
                        }
                    }, (err: httpError) =>{
                        this.loader = false;
                        this.httpErrorCode = err.httpStatusCode;
                        this.httpErrorMessage = err.httpErrorMessage;
                    });
    }
}