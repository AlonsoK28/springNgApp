import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input("loader-param") loader:boolean;
  @Input("hayError") hayError:boolean;
  @Input("errorMensaje") errorMensaje:boolean;
  @Input("sinResultados") sinResultados:boolean;

  constructor() { }

  ngOnInit() {

    // console.log(this.loader);
  }

}
