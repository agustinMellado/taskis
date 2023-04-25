import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private themeSvc: ThemeService) {
    //llama a la funcion para que cada vez que se actualice la pagina los cambios se mantengan.
    this.themeSvc.setInitialTheme()
  }
}
