import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { Book } from '../books/book.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  generi? : string[]
  searchKeyword : string = ""

  constructor(
    public catalogoService : CatalogoService,
    public cartService : CartService,
    private router : Router
  ) { }

  ngOnInit(): void {
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

  cerca(){
    // al submit del form navigo sulla rotta /search passando un param di nome chiave con dentro il valore del campo
    this.router.navigate(["/search"], { queryParams: { chiave : this.searchKeyword } })
  }

}
