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

// Sumamos las nuevas acciones permitidas (solo necesitan saber el ID del producto a modificar)
export type AccionCarrito = 
    | { type: 'AGREGAR_ITEM'; payload: ItemCarrito }
    | { type: 'RESTAR_ITEM'; payload: { productoId: number } }
    | { type: 'ELIMINAR_ITEM'; payload: { productoId: number } };

export const carritoReducer = (estado: EstadoCarrito, accion: AccionCarrito): EstadoCarrito => {
    switch (accion.type) {
        
        case 'AGREGAR_ITEM': {
            const nuevoItem = accion.payload;
            const existeItem = estado.items.find(item => item.productoId === nuevoItem.productoId);
            
            let nuevosItems;
            if (existeItem) {
                nuevosItems = estado.items.map(item => 
                    item.productoId === nuevoItem.productoId 
                        ? { ...item, cantidad: item.cantidad + nuevoItem.cantidad }
                        : item
                );
            } else {
                nuevosItems = [...estado.items, nuevoItem];
            }
            
            const nuevoTotal = nuevosItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            return { ...estado, items: nuevosItems, total: nuevoTotal };
        }

        case 'RESTAR_ITEM': {
            const id = accion.payload.productoId;
            const itemActual = estado.items.find(item => item.productoId === id);
            
            if (!itemActual) return estado; // Si el item no existe, no hacemos nada

            let nuevosItems;
            if (itemActual.cantidad > 1) {
                // Si hay más de 1, restamos la cantidad
                nuevosItems = estado.items.map(item =>
                    item.productoId === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                );
            } else {
                // Si solo queda 1, lo eliminamos de la lista
                nuevosItems = estado.items.filter(item => item.productoId !== id);
            }

            const nuevoTotal = nuevosItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            return { ...estado, items: nuevosItems, total: nuevoTotal };
        }

        case 'ELIMINAR_ITEM': {
            const id = accion.payload.productoId;
            // Filtramos la lista sacando directamente el producto, sin importar qué cantidad tenía
            const nuevosItems = estado.items.filter(item => item.productoId !== id);
            
            const nuevoTotal = nuevosItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            return { ...estado, items: nuevosItems, total: nuevoTotal };
        }
        
        default:
            return estado;
    }
};