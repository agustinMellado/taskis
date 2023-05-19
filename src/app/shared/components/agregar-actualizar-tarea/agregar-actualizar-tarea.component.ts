import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Tareas, Item } from 'src/app/models/tareas.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-agregar-actualizar-tarea',
  templateUrl: './agregar-actualizar-tarea.component.html',
  styleUrls: ['./agregar-actualizar-tarea.component.scss'],
})
export class AgregarActualizarTareaComponent implements OnInit {
  //configuracion para que se puedan editar las tareas
  @Input() tarea: Tareas;
  user = {} as User;
  //formulario para poder editar las tareas
  form = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl('', [Validators.required, Validators.minLength(4)]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    item: new FormControl([], [Validators.required, Validators.minLength(1)]),
  });
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    this.user = this.utilsSvc.getElementFromLocalStorage('user');

    //si existe la tarea
    if (this.tarea) {
      //la necesitamos visualizar para poder editarla.
      this.form.setValue(this.tarea);
      this.form.updateValueAndValidity();
    }
  }
  //funcion para ejecutar las siguientes funciones condicionalmente
  submit() {
    //solamente se ejecuta si el formulario esta completado
   
      //si existe la tarea
      if (this.tarea) {
        //estamos actualizando xq le pasamos una tarea.
        this.actualizarTarea();
      } else {
        //sino estamos creando una.
        this.crearTarea();
   
    }
  }
  //Crear tarea
  crearTarea() {
    let path = `users/${this.user.uid}`;
    //como es una petision a la bd y puede tardar llamo a la funcion
    this.utilsSvc.presentLoading();
    //borro el id una vez que se cree la tarea, para que no se guarde
    delete this.form.value.id;
    //realizo la promesa para agregar el objeto a la coleccion.
    this.firebaseSvc.addSubcollection(path, 'tareas', this.form.value).then(
      (res) => {
        this.utilsSvc.dismissModal({ success: true });
        //muestro mensaje
        this.utilsSvc.presentToast({
          message: 'Tarea creada exitosamente!',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
        //cierro la carga
        this.utilsSvc.dismissLoading();
      },
      (error) => {
        //muestro mensaje
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-checkmark-circle-outline',
          duration: 5000,
        });
        //cierro la carga
        this.utilsSvc.dismissLoading();
      }
    );
  }

  //actualizar/editar la tarea
  actualizarTarea() {
    let path = `users/${this.user.uid}/tareas/${this.tarea.id}`; //le paso la ruta exacta de donde se encuentra
    //como es una petision a la bd y puede tardar llamo a la funcion
    this.utilsSvc.presentLoading();
    //borro el id una vez que se cree la tarea
    delete this.form.value.id;
    //realizo la promesa para actualizar el objeto a la coleccion.
    this.firebaseSvc.updateDocument(path, this.form.value).then(
      (res) => {
        console.log(this.form.value);
        this.utilsSvc.dismissModal({ success: true });
        //muestro mensaje
        this.utilsSvc.presentToast({
          message: 'Tarea actualizada exitosamente!',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
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

  getPorcentaje() {
    //mando por parametro las tareas
    return this.utilsSvc.getPorcentaje(this.form.value as Tareas);
  }
  //reorganizar tareas
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.item = ev.detail.complete(this.form.value.item);
    //actualizamos despues que el usuario reordene
    this.form.updateValueAndValidity();
  }
  //remover
  removeItem(index: number) {
    //quitar elemento de un arreglo por su indice
    this.form.value.item.splice(index, 1);
    //actualizamos el formulario.
    this.form.controls.item.updateValueAndValidity();
  }
  //agregar un nuevo item de a la actividad
  createItem() {
    this.utilsSvc.presentAlert({
      header: 'Nueva Actividad',
      backdropDismiss: false, //para que no se pueda salir clickeando afuera.
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Que queres hacer?',
        },
      ],
      buttons: [
        //alerta con botones
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          handler: (res) => {
            //usamos res xq necesitamos saber el valor de la respuesta
            //agrega item
            //variable del tipo Item para almacenar y guardar
            let item: Item = { name: res.name, finalizado: false };
            //accedemos a nuestro arreglo de item y le mandamos el item nuevo que creamos
            this.form.value.item.push(item);
            //Actualizamos la lista de items
            this.form.controls.item.updateValueAndValidity();
          },
        },
      ],
    });
  }
}
