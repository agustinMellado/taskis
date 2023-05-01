import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}
  //LOADING
  //muestra que se estan cargando los datos
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  //funcion para ocultar la carga de datos
  async dismissLoading() {
    return await this.loadingController.dismiss();
  }
  //LOCALSTORAGE
  //guardado de datos en firestore
  setElementInLocalStorage(key: string, element: any) {
    //conversion a string necesaria para guardar los datos
    return localStorage.setItem(key, JSON.stringify(element));
  }
  //Tomar datos del localStorage
  getElementFrontLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  //para mostrar un mensaje por pantalla
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }
  //routeo para trabajar con la url
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  //alertas
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);

    await alert.present();
  }
}
