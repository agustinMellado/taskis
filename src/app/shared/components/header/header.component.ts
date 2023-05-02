import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //Uso el decorador Input, pasando informacion del hijo al padre.
  @Input() titulo: string;
  @Input() botonAtras: string; //para agregar ruta p/retroceder.
  @Input() isModal: boolean; //para verificar si estamos usando el header en una modal.
  @Input() color: string;
  @Input() centrarTitulo: boolean;//centra el titulo
  darkMode:BehaviorSubject<boolean>//funcion dark .
  constructor(private themeSvc: ThemeService) {}

  ngOnInit() {

    this.darkMode= this.themeSvc.darkMode;

  }
  // recibe un valor booleano para cambiar el modo a nocturno/diurno.
  setTheme(darkMode:boolean){
    //va al servicio themeService llevando el dato booleano.
    this.themeSvc.setTheme(darkMode)
  }

}
