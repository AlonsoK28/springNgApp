import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/producto';

@Component({
  selector: 'app-productos-card',
  templateUrl: './productos-card.component.html',
  styleUrls: ['./productos-card.component.css']
})
export class ProductosCardComponent implements OnInit {

  @Input("productos-param") Productos: Producto;
  @Input("sinResultados") sinResultados:boolean;
  @Input("hayError") hayError:boolean;

  constructor() { }

  ngOnInit() {
  }

}
