export interface ItemCarrito {
    productoId: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

export interface EstadoCarrito {
    items: ItemCarrito[];
    total: number;
}

export type AccionCarrito = 
    | { type: 'AGREGAR_ITEM'; payload: ItemCarrito };

export const carritoReducer = (estado: EstadoCarrito, accion: AccionCarrito): EstadoCarrito => {
    switch (accion.type) {
        case 'AGREGAR_ITEM': {
            const nuevoItem = accion.payload;
            
            // Buscamos si el ID del producto ya existe en nuestra lista
            const existeItem = estado.items.find(item => item.productoId === nuevoItem.productoId);
            
            let nuevosItems;

            if (existeItem) {
                // Si existe, mapeamos la lista y al que coincide le sumamos la cantidad
                nuevosItems = estado.items.map(item => 
                    item.productoId === nuevoItem.productoId 
                        ? { ...item, cantidad: item.cantidad + nuevoItem.cantidad }
                        : item
                );
            } else {
                // Si no existe, lo metemos al final como antes
                nuevosItems = [...estado.items, nuevoItem];
            }
            
            // El cálculo del total se mantiene idéntico, ya que la matemática de la cantidad se resolvió arriba
            const nuevoTotal = nuevosItems.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);

            return {
                ...estado,
                items: nuevosItems,
                total: nuevoTotal
            };
        }
        
        default:
            return estado;
    }
};