import { Producto } from './producto';

export class Filtrado extends Producto {
    constructor(
        id: string,
        nombre: string,
        precioBase: number,
        public tamano: 'Pocillo' | 'Mediano' | 'Taza grande',
        public gramosCafe: number,
        public variedad: 'Brasil' | 'Colombia' | 'Etiopía',
        public precioPorGramos: number
    ) 
    {
        super(id, nombre, precioBase);
    }

    calcularPrecio(): number {
        const costoCafe = this.gramosCafe * this.precioPorGramos;
        return this.precioBase + costoCafe;
    }
}