import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private firebaseSvc: FirebaseService
  ) { }

  ngOnInit() {
  }
  //cerrar sesion
  signOut() {
    //llamo a la funcion cerrar sesion
    this.firebaseSvc.signOut();
  }

}
