export interface Tareas{
    id:string;
    titulo:string;
    descripcion:string;
    items: Item[]
}
//propiedades de los items
export interface Item {
    name:string;
    finalizado:boolean;
}