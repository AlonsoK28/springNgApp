import { Component, OnInit } from '@angular/core';
import { ProductosRestApiService } from "../services/productos-rest-api.service";
import { ProductApp } from "../models/product";
import { httpError } from '../httpError';
@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
    sinResultados: boolean = false;
    Productos: ProductApp[] = [];
    loader: boolean = true;
    httpErrorCode: number;
    httpErrorMessage: string;
    constructor(private productosRestApi: ProductosRestApiService) { }

    ngOnInit() {
        this.getListadoProductos();
    }

    getListadoProductos(){
      return this.productosRestApi.getListadoProductos()
                    .subscribe(data =>{
                        this.Productos = data;
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