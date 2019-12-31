import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductApp, ProductAPI } from '../models/product';
import { Observable, throwError, pipe } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { httpErrorCode, httpError } from '../httpError';
import { deprecate } from 'util';
@Injectable({
    providedIn: 'root'
})
export class ProductosRestApiService {
    apiHOST = `172.19.78.157`;
    apiPORT = "8888";
    apiURL = `//${this.apiHOST}:${this.apiPORT}/user`;
    httpE: httpError;
    constructor(private http: HttpClient) { }
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // HttpClient API get() method => Obtiene todos los productos
    getListadoProductos(): Observable<ProductApp[]> {
        return this.http.get<ProductAPI[]>(`${this.apiURL}/articles/`)
                    .pipe(
                        map((products: ProductAPI[]) => products.map( (product:ProductAPI) => new ProductApp(product) )),
                        retry(1),
                        catchError(this.handleError))
    }

    // HttpClient API get() method => Obtiene un producto por slug (slug generado a partir del titulo de producto)
    getProductoPorSlug(slug: string): Observable<ProductApp> {
        return this.http.get<ProductAPI>(`${this.apiURL}/articleTitle/${slug}`)
                    .pipe(
                        map((producto) => new ProductApp(producto)),
                        retry(1),
                        catchError(this.handleError))
    }

    // HttpClient API delete() method => Eliminar producto por Id
    deleteProductoPorId(id: number): Observable<ProductAPI> {
        return this.http.delete<ProductAPI>(`${this.apiURL}/article/${id}`, this.httpOptions)
                        .pipe(catchError(this.handleError))
    }

    // HttpClient API update() method => Actualizar por Id
    updateProductoPorId(productoNuevo: ProductAPI): Observable<ProductAPI> {
        return this.http.put<ProductAPI>(`${this.apiURL}/article/`, JSON.stringify(productoNuevo), this.httpOptions)
                    .pipe(catchError(this.handleError))
    }

    // HttpClient API insert() method => Insertar por Id
    createProducto(productoNuevo: ProductAPI) {
        return this.http.post<ProductAPI>(`${this.apiURL}/article/`, JSON.stringify(productoNuevo), this.httpOptions)
                    .pipe(catchError(this.handleError))
    }

    // HttpClient API get() method => Obtiene todos los productos
    getListadoProductosBusqueda(termino: string): Observable<ProductApp[]> {
        return this.http.get<ProductAPI[]>(`${this.apiURL}/articleTitleSearch/${termino}`)
                    .pipe(
                        map((products: ProductAPI[]) => products.map((product: ProductAPI) => new ProductApp(product))),
                        retry(1),
                        catchError(this.handleError)
                    )
    }

    // Error handling 
    handleError(error) {
        switch (error.status) {
            case httpErrorCode[0].code:
                var httpError = httpErrorCode[0];
                this.httpE = {
                    httpStatusCode: httpError.code,
                    httpErrorMessage: httpError.message
                };
                break;
                return
            case httpErrorCode[500].code:
                var httpError = httpErrorCode[500];
                this.httpE = {
                    httpStatusCode: httpError.code,
                    httpErrorMessage: httpError.message
                };
                break;
            case httpErrorCode[404].code:
                var httpError = httpErrorCode[404];
                this.httpE = {
                    httpStatusCode: httpError.code,
                    httpErrorMessage: httpError.message
                };
                break;
            case httpErrorCode[409].code:
                var httpError = httpErrorCode[409];
                this.httpE = {
                    httpStatusCode: httpError.code,
                    httpErrorMessage: httpError.message
                };
                break;
        }
        // if (error.error instanceof ErrorEvent) {
        //   // Get client-side error
        //   errorMessage = error.error.message;
        // } else {

        //   // Get server-side error
        //   // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        // }
        return throwError(this.httpE);
    }

    private generateProductsAppArray(productObj: object): ProductApp[] {
        const producs: ProductApp[] = [];

        if ( productObj == null ){
            return [];
        }

        Object.keys(productObj).forEach(key => {
            const produc: ProductApp = new ProductApp(productObj[key]);
            producs.push(produc);
        });
        return producs;
    }
}