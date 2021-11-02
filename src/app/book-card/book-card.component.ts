import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/books/book.model';
import { CartService } from 'src/app/services/cart.service';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() book!: Book;

  constructor(
    public catalogoService : CatalogoService
  ) {
  }

  ngOnInit(): void { }

  

}
