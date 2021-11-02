import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkCategorie'
})

// DOESN'T WORK FINE
export class LinkCategoriePipe implements PipeTransform {

  constructor(private sanitized : DomSanitizer){}

  // <a routerLink="/categoria/...">...</a> per ogni genere trovato
  // se il parametro del separatore non c'è, utilizzo " / " di default
  // ES: ['Classici', 'Horror'] -> <a routerLink="/categoria/classici">Classici</a> / <a routerLink="/categoria/horror">Horror</a>
  transform(value: string[], ...args: string[]): SafeHtml {
    let separatore = args[0] || " / "
    let html = ""
    for(let genere of value){
      html += `<a routerLink="/categoria/${genere.toLowerCase()}">${genere}</a>${separatore}`
    }
    // tolgo l'ultimo separatore dalla stringa di output
    html = html.substr(0, html.length - separatore.length)
    return this.sanitized.bypassSecurityTrustHtml(html)
  }

}
