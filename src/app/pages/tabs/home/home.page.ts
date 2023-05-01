import { Component, OnInit } from '@angular/core';
import { Tareas } from 'src/app/models/tareas.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //Variable que va a almacenar una cadena de objetos
  tareas: Tareas[] = [
    {
      id: '1',
      titulo: ' primer tarea',
      descripcion: 'Primer terea de prueba',
      item: [{
        name:'act 1', finalizado:true,
      },{
        name:'act 2', finalizado:false,
      },{
        name:'afalse', finalizado:false,
      }],
    },
    {
      id: '2',
      titulo: ' 2da tarea',
      descripcion: 'Primer terea de prueba',
      item: [{
        name:'act 1', finalizado:true,
      },{
        name:'act 2', finalizado:false,
      },{
        name:'afalse', finalizado:false,
      }],
    },
    {
      id: '3',
      titulo: ' 3er tarea',
      descripcion: 'Primer terea de prueba',
      item: [{
        name:'act 1', finalizado:true,
      },{
        name:'act 2', finalizado:false,
      },{
        name:'afalse', finalizado:false,
      }],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
