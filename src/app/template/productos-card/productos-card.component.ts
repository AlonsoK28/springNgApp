import { Component, OnInit, Input } from '@angular/core';
import { ProductApp } from 'src/app/models/product';

@Component({
  selector: 'app-productos-card',
  templateUrl: './productos-card.component.html',
  styleUrls: ['./productos-card.component.css']
})
export class ProductosCardComponent implements OnInit {

  @Input("productos-param") Productos: ProductApp;

  constructor() { }

  ngOnInit() {
    // console.log("Productos loader component: ", JSON.stringify(this.Productos));
  }

  // Validate if an array is empty
  arrayIsValid(array){
    if(typeof array !== 'undefined'){
      return true;
    }
    return false;
  }

}
