import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MasterComponent } from './master/master.component';
import { CartService } from './services/cart.service';
import { CatalogoService } from './services/catalogo.service';
import localeIt from '@angular/common/locales/it';
import { FooterComponent } from './footer/footer.component';
import { BookCardComponent } from './book-card/book-card.component';
import { HomeComponent } from './home/home.component';
import { registerLocaleData } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { OfferteComponent } from './offerte/offerte.component';
import { ContattiComponent } from './contatti/contatti.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { SingleComponent } from './single/single.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LinkCategoriePipe } from './pipes/link-categorie.pipe';
import { AddToCartSelectComponent } from './add-to-cart-select/add-to-cart-select.component';
import { SetToCartSelectComponent } from './set-to-cart-select/set-to-cart-select.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    MasterComponent,
    HeaderComponent,
    FooterComponent,
    BookCardComponent,
    HomeComponent,
    SearchComponent,
    OfferteComponent,
    ContattiComponent,
    CarrelloComponent,
    SingleComponent,
    NotFoundComponent,
    LinkCategoriePipe,
    AddToCartSelectComponent,
    SetToCartSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    CatalogoService,
    CartService,
    { provide: LOCALE_ID, useValue: 'it-IT' }
  ],
  bootstrap: [MasterComponent]
})
export class AppModule { }
