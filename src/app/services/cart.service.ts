import { Injectable } from '@angular/core';
import { Book, ItemInCart } from '../books/book.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private LS_KEY = "Ecommerce_cart"
  cart : ItemInCart[]

  constructor() {
    if(sessionStorage.getItem(this.LS_KEY)){
      this.cart = JSON.parse(sessionStorage.getItem(this.LS_KEY)!) as ItemInCart[]
    }
    else {
      this.cart = []
    }
  }

  add(b: Book, qty: number){
    // verifico se il Book b è già presente nel cart
    let presente = this.cart.find(
      (i : ItemInCart) => i.item.isbn === b.isbn
    )
    // se non lo trovo -> push
    if(!presente){
      this.cart.push(
        { item: b, qtyInCart: qty }
      )
    }
    // altrimenti (già presente) -> aumento la qtyInCart in quella posizione
    else {
      this.cart[this.cart.indexOf(presente)].qtyInCart += qty
    }
    this.syncToStorage()
  }

  getCount() : number {
    let tot = 0
    for(let i of this.cart){
      tot += i.qtyInCart
    }
    return tot
  }

  remove(){}

  clear(){}

  updateQty(){}

  getTotal() : number {
    let tot = 0
    for(let i of this.cart){
      let prezzo = i.item.price
      // PROMO -15%
      if(i.item.promo){ prezzo = prezzo * 0.85 }
      // OFFERTA SPECIALE -25%
      else if(i.item.offerta_speciale){ prezzo = prezzo * 0.75 }
      tot += prezzo * i.qtyInCart
    }
    return tot
  }

  syncToStorage(){
    sessionStorage.setItem(this.LS_KEY, JSON.stringify(this.cart))
  }

  // numero di occorrenze di un determinato book nel cart
  numberOfBooksInCart(b: Book) : number {
    return this.cart.find((i : ItemInCart) => i.item.isbn === b.isbn )?.qtyInCart || 0
  }

}

