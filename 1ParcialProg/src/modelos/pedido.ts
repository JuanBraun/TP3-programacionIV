export interface ItemPedido {
    productId: string;
    cantidad: number;
}

export class Pedido {
    constructor(
        public id: string,
        public items: ItemPedido[],
        public estado: 'pendiente' | 'entregado' = 'pendiente',
        public mesaId?: number | null 
    ) {}
}