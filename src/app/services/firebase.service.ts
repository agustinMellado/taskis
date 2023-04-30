import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}
  //autentificacion

  //logueo
  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  //Registro
  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
}
