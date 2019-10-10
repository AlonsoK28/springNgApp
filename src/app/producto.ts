import { ProductoBase } from "./producto-base";

export class Producto implements ProductoBase{
       imagen:String
    articleId:Number
           id:Number
        title:String
       titulo:String
     category:String
    categoria:String


     constructor(producto: ProductoBase){
         this.id        = producto.articleId;
         this.titulo    = producto.title;
         this.categoria = producto.category;
         this.imagen    = "https://via.placeholder.com/350x150"
     }


}

export class ProductoNuevo implements ProductoBase{
       imagen:String
    articleId:Number
           id:Number
        title:String
       titulo:String
     category:String
    categoria:String


     constructor(producto: Producto){
        this.articleId = producto.id;
        this.title     = producto.titulo;
        this.category  = producto.categoria;
     }


}

export class ProductoAgregar{
        title:String
       titulo:String
     category:String
    categoria:String


     constructor(titulo:string, categoria:string){
        this.title     = titulo;
        this.category  = categoria;
     }


}

