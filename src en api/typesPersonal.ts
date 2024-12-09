
export interface Personal{
    id:number,
    nombre:String;
    direccion:String,
    telefono:String,
    estatus:number
}

export type PersonalNuevo = Omit<Personal, 'id'>;