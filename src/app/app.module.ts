import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//imports needed
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ProductoNuevoComponent } from './producto-nuevo/producto-nuevo.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { ProductosCardComponent } from './template/productos-card/productos-card.component';
import { ProductoBusquedaComponent } from './producto-busqueda/producto-busqueda.component';
import { WordToSlugPipe } from './pipes/word-to-slug.pipe';
import { SlugToWordPipe } from './pipes/slug-to-word.pipe';

//vendor
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, 
  faCircleNotch, 
  faPoll, 
  faExclamationTriangle, 
  faAsterisk, 
  faPlusCircle, 
  faSearch, 
  faTimes, 
  faCheckCircle, 
  faArrowCircleLeft, 
  faInfoCircle, 
  faBackspace, 
  faFont, 
  faPaperclip,
  faShoppingBasket,
  faStarHalfAlt, 
  faStarHalf} from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab, faAngular } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductosComponent,
    ProductoDetalleComponent,
    ProductoNuevoComponent,
    LoaderComponent,
    FooterComponent,
    ProductosCardComponent,
    ProductoBusquedaComponent,
    WordToSlugPipe,
    SlugToWordPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons( faAngular, 
      faCircleNotch, 
      faPoll, 
      faExclamationTriangle, 
      faAsterisk, 
      faPlusCircle, 
      faSearch, 
      faTimes, 
      faArrowCircleLeft, 
      faInfoCircle, 
      faBackspace, 
      faCheckCircle, 
      faFont,
      faPaperclip,
      faShoppingBasket,
      faStarHalfAlt );  
  }
}
