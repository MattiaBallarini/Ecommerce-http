import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../books/book.model';

@Injectable({
  providedIn: 'root' 
})
export class CatalogoService {


  constructor(private http : HttpClient) {
  }

  // Utilizzare una Map per contare le occorrenze
  /*getGeneri() : string[] {
    let output = new Set<string>()
    for(let book of this.catalogo){
        for(let genere of book.genre){
            output.add(genere)
        }
    }
    return Array.from(output).sort()

  }*/

  // 8 => [1,2,3,4,5,6,7,8]
  numberToArray(numero : number) : number[] {
    let theArray = []
    for(let i = 1; i <= numero; i++){
        theArray.push(i)
    }
    return theArray
  }

  // torna un Book cercandolo per ISBN (se presente)
  getById(isbn: string) : Observable<Book> {
    // ws vuole un parametro di nome "chiave" con il valore dell'ISBN del libro
    // 1. QUERYSTRING: www.ivano.com?parametro1=valore1&parametro2=valore2...
    // 2. Utilizzare il secondo parametro { params: xxx } della get()
    return this.http.get<Book>(
      `${environment.endPoint}/getBookById.php`,
      { params: { chiave : isbn } }
    )
  }

  search(cat: string) : Observable<Book[]> {
    return this.http.get<Book[]>(
      `${environment.endPoint}/searchBooks.php`,
      {
        params : {
          genere : cat
        }
      }
    )

    // let parametri = new HttpParams().set("genere", cat)
    // return this.http.get<Book[]>(
    //   `${environment.endPoint}/searchBooks.php`, { params : parametri }
    // )

  }

  searchByKeyword(k : string) : Observable<Book[]> {
    return this.http.get<Book[]>(
      `${environment.endPoint}/searchBooks.php`,
      {
        params : {
          keyword : k
        }
      }
    )
  }

  downloadCatalogo() : Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.endPoint}/getBooks.php`)
  }

}
