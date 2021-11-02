import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { environment } from 'src/environments/environment';
import { Book } from '../books/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  libroInOfferta? : Book
  libriInPromo? : Book[]

  constructor(
    public catalogoService : CatalogoService,
    // service di Angular per effettuare chiamate HTTP
    private http : HttpClient
  ) { }

  ngOnInit(): void {
    this.catalogoService.downloadCatalogo().subscribe(
      (catalogoLibri : Book[]) => { 
        this.libroInOfferta = catalogoLibri.find((b : Book) => b.offerta_speciale)
        this.libriInPromo = catalogoLibri.filter((b : Book) => b.promo )
      } 
    )
  }

}
