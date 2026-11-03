import { Producto } from './producto';

export class Pasteleria extends Producto {
    constructor(id: string, nombre: string, precioBase: number) {
        super(id, nombre, precioBase);
    }

    calcularPrecio(): number {
        return this.precioBase;
    }
}