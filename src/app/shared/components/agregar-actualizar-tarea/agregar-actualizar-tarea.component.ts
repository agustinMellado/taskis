import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User} from 'src/app/models/user.model';
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
  getPorcentaje() {
    //mando por parametro las tareas
    return this.utilsSvc.getPorcentaje(this.form.value as Tareas);
  }
  //reorganizar tareas
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.item = ev.detail.complete(this.form.value.item);
    //actualizamos despues que el usuario reordene
    this.form.updateValueAndValidity()
  }
  //remover
  removeItem(index: number) {
    //quitar elemento de un arreglo por su indice
    this.form.value.item.splice(index,1);
    //actualizamos el formulario.
    this.form.updateValueAndValidity()
  }
  //agregar un nuevo item de a la actividad
  createItem(){
    this.utilsSvc.presentAlert({
      header:'Nueva Actividad',
      backdropDismiss:false,//para que no se pueda salir clickeando afuera.
      inputs:[
        {
          name:'name',
          type:'textarea',
          placeholder: 'Que queres hacer?',
          
        }
      ],buttons: [//alerta con botones
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          handler: (res) => { //usamos res xq necesitamos saber el valor de la respuesta
            //agrega item
            //variable del tipo Item para almacenar y guardar
            let item : Item={name:res.name, finalizado: false};
            //accedemos a nuestro arreglo de item y le mandamos el item nuevo que creamos
            this.form.value.item.push(item);
             //Actualizamos la lista de items
            this.form.updateValueAndValidity()
          },
        },
      ],
    })
  }
}
