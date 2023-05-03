import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //creacion de variable apra objeto que almacena  la informacion del usuario.
  user = {} as User;
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}
  //funcion para cargar informacion de cada usuario que entra a la pagina.
  ionViewWillEnter() {
    //se ejecuta cuando el usuario entra a la pagina
    this.getUser();
  }


  //tomo informacion del usuario
  getUser() {
    return this.user = this.utilsSvc.getElementFromLocalStorage('user');
  }

  //cerrar sesion
  signOut() {
    this.utilsSvc.presentAlert({
      header: 'Cerrar Sesion',
      message: '¿Quieres cerrar sesion?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Si, cerrar',
          handler: () => {
            //cierra sesion
            this.firebaseSvc.signOut();
          },
        },
      ],
    });
  }
}
