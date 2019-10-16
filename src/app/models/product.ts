export interface ProductAPI{
    articleId?:number;
    title?: string;
    category?: string;
}

export interface ProductApp{
    id:number;
    titulo: string;
    categoria: string;
}

export class ProductApp implements ProductApp{
    id: number;
    titulo: string;
    categoria: string;
    imagen: string;
    constructor(product: ProductAPI | any){
        this.id = product.articleId;
        this.titulo = product.title;
        this.categoria = product.category;
        this.imagen = "https://via.placeholder.com/350x150";
    }
}

export class ProductAPI implements ProductAPI   {
    articleId?: number;
    title?: string;
    category?: string;
    productObj:object;
    
    constructor(product?: ProductApp | any){
        this.articleId = product.id;
        this.title = product.titulo;
        this.category = product.categoria;
    }

}