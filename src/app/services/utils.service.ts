import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
  ) { }
//LOADING
//forma de carga asincrona de los datos
  async presentLoading(opts:LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  //funcion para ocultar la carga de datos
  async dismissLoading() {
    return await this.loadingController.dismiss();

  }
  //LOCALSTORAGE
  //guardado de datos en firestore
  setElementInLocalStorage(key:string, element:any){
    //conversion a string necesaria para guardar los datos
    return localStorage.setItem(key, JSON.stringify(element));

  }
  //Tomar datos del localStorage
  getElementFrontLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key))
  }

  //routeo para trabajar con la url
  routerLink(url:string){
    return this.router.navigateByUrl(url);
  }
}
