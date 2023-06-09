import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  //Variable que escucha los cambios y los refleja en todos los componentes.
  darkMode = new BehaviorSubject(false);
  constructor() {}

  setInitialTheme() {
    //una vez obtenido el valor necesitamos volverlo booleano
    let darkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (darkMode) {
      this.setTheme(darkMode);
    } else {
      this.setTheme(darkMode);
    }
  }

  //funcion para pone en modo oscuro la aplicacion
  setTheme(darkMode: boolean) {
    if (darkMode) {
      //cambiamos el modo a dark
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
    //escucha los cambios y los aplica.
    this.darkMode.next(darkMode);
    //guarda el cambio aplicado
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }
}
