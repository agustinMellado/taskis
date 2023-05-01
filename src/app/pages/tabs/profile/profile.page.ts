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
    this.getUser()
  }

  //cerrar sesion
  signOut() {
    //llamo a la funcion cerrar sesion
    this.firebaseSvc.signOut();
  }
  //tomo informacion del usuario
  getUser() {
    return (this.user = this.utilsSvc.getElementFrontLocalStorage('user'));
  }
}
