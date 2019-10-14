import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto, ProductoNuevo, ProductoAgregar } from '../producto';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { httpErrorCode, httpError } from '../httpError';
@Injectable({
  providedIn: 'root'
})
export class ProductosRestApiService {
  apiHOST = `172.19.78.157`;
  apiPORT = "8888";
  apiURL = `//${this.apiHOST}:${this.apiPORT}/user`;
  Producto: Producto;
  httpE: httpError;
  constructor(private http: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  
  // HttpClient API get() method => Obtiene todos los productos
  getListadoProductos(): Observable <Producto[]> {
      return this.http
                 .get<Producto[]>(`${this.apiURL}/articles/`)
                 .pipe( map((productos: Producto[]) => productos.map(producto => new Producto(producto))), 
                        catchError(this.handleError))
  }
  
  // HttpClient API get() method => Obtiene un producto por id
  getProductoPorId(id: Number): Observable <Producto> {
      return this.http
                 .get<Producto>(`${this.apiURL}/article/${id}`)
                 .pipe(map((producto: Producto) => new Producto(producto)), catchError(this.handleError))
  }
  // HttpClient API get() method => Obtiene un producto por slug (slug generado a partir del titulo de producto)
  getProductoPorSlug(slug: string): Observable <Producto> {
      return this.http
                 .get<Producto>(`${this.apiURL}/articleTitle/${slug}`)
                 .pipe(map((producto: Producto) => new Producto(producto)), catchError(this.handleError))
  }

  // HttpClient API delete() method => Eliminar producto por Id
  deleteProductoPorId(id: Number) {
    return this.http.delete<Producto>(`${this.apiURL}/article/${id}`, this.httpOptions)
               .pipe( retry(1), 
                      catchError(this.handleError))
  }

  // HttpClient API update() method => Actualizar por Id
  updateProductoPorId(productoNuevo:ProductoNuevo): Observable<ProductoNuevo> {
    return this.http.put<ProductoNuevo>(`${this.apiURL}/article/`, JSON.stringify(productoNuevo), this.httpOptions)
               .pipe( retry(1), 
                      catchError(this.handleError))
  }
  
  // HttpClient API insert() method => Insertar por Id
  createProducto(productoNuevo: ProductoAgregar) {
    return this.http.post<Producto>(this.apiURL + '/article/', JSON.stringify(productoNuevo), this.httpOptions)
               .pipe( retry(1), 
                      catchError(this.handleError))
  }

  // HttpClient API get() method => Obtiene todos los productos
  getListadoProductosBusqueda(termino: string): Observable<Producto[]> {
    return this.http
               .get<Producto[]>(`${this.apiURL}/articleTitleSearch/${termino}`)
               .pipe( map((productos: Producto[]) => productos.map(producto => new Producto(producto))), 
                      catchError(this.handleError))
  }

  // Error handling 
  handleError(error) {
    console.log(error);
    switch (error.status) {
      case httpErrorCode[0].code:  
        this.httpE = {
          httpStatusCode: httpErrorCode[0].code,
          httpErrorMessage: httpErrorCode[0].message
        };
        break;
        return 
      case httpErrorCode[500].code:
        this.httpE = {
          httpStatusCode: httpErrorCode[500].code,
          httpErrorMessage: httpErrorCode[404].message
        };
        break;
      case httpErrorCode[404].code:
        this.httpE = {
          httpStatusCode: httpErrorCode[404].code,
          httpErrorMessage: httpErrorCode[404].message
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
}