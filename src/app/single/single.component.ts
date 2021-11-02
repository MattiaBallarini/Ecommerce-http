import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../books/book.model';
import { CartService } from '../services/cart.service';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  book? : Book

  constructor(
    // service di Angular che mi dà informazioni sulla rotta corrente
    private ar : ActivatedRoute,
    public catalogoService : CatalogoService,
    public cartService : CartService,
    // service di Angular per gestire il Router
    private router : Router
  ) {
  }

  ngOnInit(): void {
    this.ar.params.subscribe(
      (parametri : Params) => { 
        this.catalogoService.getById(parametri.isbnLibro).subscribe(
          (b : Book) => { this.book = b },
          // 404
          (e) => { this.router.navigate(["/notfound"]) }
        )
      }
    )
  }

  getDisponibilita(){
    let q = this.book!.stock - this.cartService.numberOfBooksInCart(this.book!)
    return {
      "text-success" : q > 10,
      "text-warning" : q <= 10 && q >= 5,
      "text-danger" : q < 5
    }
  }

}
