export abstract class Producto {
    constructor(
        public id: string,
        public nombre: string,
        public precioBase: number
    ) {}

    abstract calcularPrecio(): number;
}