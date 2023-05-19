import { Component, OnInit } from '@angular/core';
import { Tareas } from 'src/app/models/tareas.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AgregarActualizarTareaComponent } from 'src/app/shared/components/agregar-actualizar-tarea/agregar-actualizar-tarea.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //Variable que va a almacenar una cadena de objetos
  tareas: Tareas[] = [];
  user = {} as User;
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}
  //Al entrar a la pagina inicia y muestra la funcion
  ionViewWillEnter() {
    //llama a estas funciones
    this.getTask();
    this.getUser();
  }
  getUser() {
    return (this.user = this.utilsSvc.getElementFromLocalStorage('user'));
  }

  getPorcentaje(tarea: Tareas) {
    //mando por parametro las tareas
    return this.utilsSvc.getPorcentaje(tarea);
  }
  async agregarOActualizarTarea(tarea?: Tareas) {
    //funcion para traer las tareas una vez que esta se haya creado/actualizado
    let res = await this.utilsSvc.presentModal({
      component: AgregarActualizarTareaComponent,
      componentProps: { tarea },
      cssClass: 'agregar-actualizar-modal',
    });
    //si existe, llamamos para que actualice la vista
    if (res && res.success) {
      this.getTask();
    }
  }
  // agarro las tareas
  getTask() {
    let user: User = this.utilsSvc.getElementFromLocalStorage('user');
    //nombre de la coleccion
    let path = `users/${user.uid}`; //toma el id
    //pasamos el path mas el nombre de la coleccion para suscribirnos
    let sub = this.firebaseSvc.getSubcollection(path, 'tareas').subscribe({
      next: (res: Tareas[]) => {
        console.log(res);
        this.tareas = res;
        sub.unsubscribe(); //aplicamos unsubscribe para no saturar a la base de datos con consultas.
      },
    });
  }
  //funcion para borrar
  borrarTarea(tarea: Tareas) {
    let path = `users/${this.user.uid}/tareas/${tarea.id}`; //le paso la ruta exacta de donde se encuentra
    //como es una petision a la bd y puede tardar llamo a la funcion
    this.utilsSvc.presentLoading();

    //realizo la promesa para borrar el objeto a la coleccion.
    this.firebaseSvc.deleteDocument(path).then(
      (res) => {
        //muestro mensaje
        this.utilsSvc.presentToast({
          message: 'Tarea eliminada exitosamente!',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
        //cuando termine de eliminar la tarea actualizamos vista
        this.getTask()
        this.utilsSvc.dismissLoading();
      },
      (error) => {
        //muestro mensaje
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-checkmark-circle-outline',
          duration: 5500,
        });
        this.utilsSvc.dismissLoading();
      }
    );
  }
  //funcion de confirmacion
  confirmarDelete(tarea:Tareas){
    this.utilsSvc.presentAlert({
      header: 'eliminar tarea',
      message: '¿Quieres eliminar esta tarea?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            //eliminamos la tarea
            this.borrarTarea(tarea)
          },
        },
      ],
    });
  }
}
