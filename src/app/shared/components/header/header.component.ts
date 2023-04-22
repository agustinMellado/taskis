import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //Uso el decorador Input, pasando informacion del hijo al padre
  @Input() titulo: string;
  @Input() botonAtras: string; //para agregar ruta p/retroceder
  @Input() isModal: string; //para verificar si estamos usando el header en una modal
  @Input() color: string;
  @Input() centrarTitulo: boolean;
  
  darkMode;
  constructor() {}

  ngOnInit() {}

  setTheme(darkMode:boolean){
    this.darkMode = darkMode;
  }
}
