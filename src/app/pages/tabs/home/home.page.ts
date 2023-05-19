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

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}
  //Al entrar a la pagina inicia y muestra la funcion
  ionViewWillEnter() {
    //llama a esta funcion
    this.getTask();
  }

  getPorcentaje(tarea: Tareas) {
    //mando por parametro las tareas
    return this.utilsSvc.getPorcentaje(tarea);
  }
  async agregarOActualizarTarea(tarea?: Tareas) {
    //funcion para traer las tareas una vez que esta se haya creado/actualizado
    let res= await this.utilsSvc.presentModal({
      component: AgregarActualizarTareaComponent,
      componentProps: { tarea },
      cssClass: 'agregar-actualizar-modal',
    });
    //si existe, llamamos para que actualice la vista
    if (res&&res.success){
    this.getTask()
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
}
