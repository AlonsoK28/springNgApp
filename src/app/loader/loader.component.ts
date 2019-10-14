import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input("loader-param") loader:boolean;
  @Input("sinResultados") sinResultados:boolean;
  //http status code errors
  @Input("httpErrorCode") httpErrorCode:number;
  @Input("httpErrorMessage") httpErrorMessage:string;

  constructor() { 

  }

  ngOnInit() {
    // console.log("loader: ", this.loader);
    // console.log("sinResultados: ", this.sinResultados);
  }

}
