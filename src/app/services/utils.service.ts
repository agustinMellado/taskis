import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Tareas } from '../models/tareas.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
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
  //funciones modals
  //presentar o abrir modal
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts)
    
    await modal.present();
    //la modal devuelve un valor despues de que se cierre
    const {data} = await modal.onWillDismiss()
    //tomo ese valor y lo condiciono
    if(data){//si existe esa informacion la retornamos
      return data;
    }
  }
  //cerrar modal
  dismissModal(data?:any){
    this.modalController.dismiss(data)
  }

  //funcion para tomar el porcentaje de las tareas
  getPorcentaje(tarea:Tareas){
    //obtengo todas los items finalizados en true
    let itemCompletados=tarea.item.filter(item=>item.finalizado).length;

    let TotalItem= tarea.item.length;//total de tareas del arreglo
    let porcentaje= (100/TotalItem)*itemCompletados;
    //aplico parseInt para que de un numero entero 
    return parseInt(porcentaje.toString())//.toString();para que lo tome como un texto y convierta

  }
}
