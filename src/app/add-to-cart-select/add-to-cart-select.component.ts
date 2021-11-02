import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../books/book.model';
import { CartService } from '../services/cart.service';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-add-to-cart-select',
  templateUrl: './add-to-cart-select.component.html',
  styleUrls: ['./add-to-cart-select.component.css']
})
export class AddToCartSelectComponent implements OnInit {

  @Input() book!: Book;
  @Input() cssClass!: string;
  qta: string = ""

  constructor(
    public catalogoService : CatalogoService,
    public cartService : CartService
  ) {
  }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.add(this.book, parseInt(this.qta))
    console.log("CART -> ", this.cartService.cart)
    this.qta = ""
  }

}
