import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { getAuth, updateProfile } from 'firebase/auth';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService
  ) {}
  //autentificacion

  //logueo
  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  //Registro
  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  //Actualizar usuario
  updateUser(user: any) {
    const auth = getAuth();
    return updateProfile(auth.currentUser, user);
  }
  //retornamos el estado de la autenticacion del usuario.
  getAuthState() {
    return this.auth.authState;
  }
  //Cerrar sesion
  async signOut() {
    await this.auth.signOut();
    //redirecciono la url
    this.utilsSvc.routerLink('/auth');
    //funcion para remover el user del localStorage
    localStorage.removeItem('user');
  }

  // firestore base de datos

  getSubcollection(path: string, subcollectionName: string) {
    //mandamos el id del elemento tarea 
    return this.db.doc(path).collection(subcollectionName).valueChanges({idField:'id'})
  }
  //crear una nueva tarea
  addSubcollection(path: string, subcollectionName: string, object:any) {

    return this.db.doc(path).collection(subcollectionName).add(object)//al pasar el objeto nos crea un id de manera random
    
  }
  //actualizar documento especifico
  updateDocument(path: string, object:any){//recibe por parametro la ruta y el objeto a modifica
    //busco por la ruta y actualizo el objeto
    return this.db.doc(path).update(object);

  }
  //borrar tarea
  deleteDocument(path: string){    
    return this.db.doc(path).delete();

  }


}
