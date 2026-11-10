// Definimos la estructura de un ítem dentro del carrito
export interface ItemCarrito {
    productoId: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

// Definimos cómo es el estado global del carrito
export interface EstadoCarrito {
    items: ItemCarrito[];
    total: number;
}

// Definimos las acciones que puede recibir nuestro reducer (por ahora solo agregar)
export type AccionCarrito = 
    | { type: 'AGREGAR_ITEM'; payload: ItemCarrito };

// El cerebro matemático: recibe el estado actual, una acción, y devuelve el NUEVO estado
export const carritoReducer = (estado: EstadoCarrito, accion: AccionCarrito): EstadoCarrito => {
    switch (accion.type) {
        case 'AGREGAR_ITEM': {
            const nuevoItem = accion.payload;
            
            // Copiamos los ítems que ya estaban y agregamos el nuevo al final
            const nuevosItems = [...estado.items, nuevoItem];
            
            // Recalculamos el total sumando el precio * cantidad de cada ítem en el carrito
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