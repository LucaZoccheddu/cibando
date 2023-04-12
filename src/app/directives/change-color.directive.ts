import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {
  @HostBinding('style.background-color') background: string;
  @HostBinding('style.color') color: string;

  @HostBinding('placeholder') disable = '';

  coloriSfondo = ['red', 'orange', 'darkred'];
  coloriTesto = ['white', 'black', 'grey'];

  @HostListener('keydown') nuovoColore() {
    const coloreBackground = Math.floor(Math.random() * this.coloriSfondo.length);
    const coloreTesto = Math.floor(Math.random() * this.coloriTesto.length);

    this.background = this.coloriSfondo[coloreBackground];
    this.color = this.coloriTesto[coloreTesto];
  }

  @HostListener('mouseover') mostraNome() {
    this.disable = 'sei posizionato sopra al campo nome'
  }

  @HostListener('mouseout') togliNome() {
    this.disable = '';
  }

  constructor() { }

}
