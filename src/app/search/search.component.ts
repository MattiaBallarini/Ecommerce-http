import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from '../books/book.model';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  filtroGenere?: string
  filtroPrezzoDa: string = ""
  filtroPrezzoA: string = ""
  results?: Book[]
  unfilteredResults?: Book[]
  generi?: string[]
  sorting : string = "3"

  constructor(
    private ar: ActivatedRoute,
    private catalogoService: CatalogoService
  ) { }

  ngOnInit(): void {
    // URL : /categoria/Kids (route parameter, app.routing.module)
    this.ar.params.subscribe(
      (p: Params) => {
        this.filtroGenere = p.nomeCategoria
        this.filtroPrezzoA = ""
        this.filtroPrezzoDa = ""
        this.catalogoService.search(this.filtroGenere!).subscribe(
          (risultati : Book[]) => { 
            this.results = risultati 
            this.unfilteredResults = risultati
            this.ordina()
          }
        )
        this.catalogoService.downloadCatalogo().subscribe(
          (cat : Book[]) => {
            let output = new Set<string>()
            for(let book of cat){
                for(let genere of book.genre){
                    output.add(genere)
                }
            }
            this.generi = Array.from(output).sort()
          }
        )
      }
    )
    // URL : /search?chiave=XXX (querystring patameter, passato dal form di ricerca)
    this.ar.queryParams.subscribe(
      (p : Params) => {
        if(!p.chiave){ return }
        this.catalogoService.searchByKeyword(p.chiave).subscribe(
          (b : Book[]) => {
            this.results = b
            this.unfilteredResults = b
          }
        )
      }
    )
  }

  ordina(){
    switch(this.sorting){
      case "1":
        this.results!.sort(
          (a : Book, b : Book) => {
            if(a.price > b.price)
              return -1
            else if(a.price < b.price) 
              return 1
            else
              return 0
          }
        )
        break
      case "2":
        this.results!.sort(
          (a : Book, b : Book) => {
            if(a.price > b.price)
              return 1
            else if(a.price < b.price) 
              return -1
            else
              return 0
          }
        )
        break
      case "3":
        this.results!.sort(
          (a : Book, b : Book) => {
            if(a.title > b.title)
              return 1
            else if(a.title < b.title) 
              return -1
            else
              return 0
          }
        )
        break
      case "4":
        this.results!.sort(
          (a : Book, b : Book) => {
            if(a.title > b.title)
              return -1
            else if(a.title < b.title) 
              return 1
            else
              return 0
          }
        )
        break
    }
  }

  filtraPrezzo(){
    // filtra da... a...
    // se da non è valorizzato (o non è un numero) -> utilizza solo "a"
    // se a non è valorizzato (o non è un numero) -> utilizza solo "da"
    let da = parseInt(this.filtroPrezzoDa)
    let a = parseInt(this.filtroPrezzoA)
    this.results = this.unfilteredResults!
                    .filter( (b : Book) => !isNaN(da) ? b.price >= da : true )
                    .filter( (b : Book) => !isNaN(a) ? b.price <= a : true )
  }

}
