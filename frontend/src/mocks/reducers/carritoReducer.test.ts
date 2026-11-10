import { describe, it, expect } from 'vitest';
import { carritoReducer, EstadoCarrito, AccionCarrito } from './carritoReducer';

describe('Lógica del carritoReducer', () => {
    it('Debe agregar un producto nuevo al carrito vacío y calcular el total', () => {
        // 1. Escenario: El carrito arranca vacío
        const estadoInicial: EstadoCarrito = { 
            items: [], 
            total: 0 
        };
        
        // 2. Acción: El cliente aprieta "Agregar al pedido" en un café
        const accion: AccionCarrito = {
            type: 'AGREGAR_ITEM',
            payload: { 
                productoId: 1, 
                nombre: 'Expreso Pocillo', 
                precio: 6200, 
                cantidad: 1 
            }
        };

        // 3. Ejecución: El reducer calcula el nuevo estado
        const nuevoEstado = carritoReducer(estadoInicial, accion);

        // 4. Validación: Exigimos que haya 1 ítem y que el total sea 6200
        expect(nuevoEstado.items).toHaveLength(1);
        expect(nuevoEstado.items[0].nombre).toBe('Expreso Pocillo');
        expect(nuevoEstado.total).toBe(6200);
    });
});