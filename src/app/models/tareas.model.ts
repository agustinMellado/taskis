export interface Tareas{
    id:string;
    titulo:string;
    descripcion:string;
    item: Item[]
}
//propiedades de los items
export interface Item {
    name:string;
    complete:boolean;
}