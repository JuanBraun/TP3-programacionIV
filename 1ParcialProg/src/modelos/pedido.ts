export interface ItemPedido {
    productoId: string;
    cantidad: number;
}

export class Pedido {
    constructor(
        public id: string,
        public items: ItemPedido[],
        public estado: 'pendiente' | 'entregado' = 'pendiente'
    ) {}
}