import { describe, it, expect } from 'vitest';
import { Expreso } from '../modelos/expreso';
import { Filtrado } from '../modelos/filtrado';
import { Pasteleria } from '../modelos/pasteleria';
import { CafeService } from '../services/cafeServices';
import { Te } from "../modelos/te";

describe('Cafetería Origen - Pruebas Unitarias y de Negocio', () => {
    it('Debe calcular correctamente el precio de un Expreso', () => {
    // Expreso Mediano con 27g de café Colombia a $180 el gramo, precio base $2500
    // Costo café = 27 * 180 = 4860. Precio final = 2500 + 4860 = 7360
        const expreso = new Expreso('1', 'Expreso Colombia', 2500, 'Mediano', 27, 'Colombia', 180);
        expect(expreso.calcularPrecio()).toBe(7360);
    });

    it('Debe calcular correctamente el precio de un Filtrado', () => {
    // Filtrado Taza grande con 25g de Etiopía a $240 el gramo, precio base $3200
    // Costo café = 25 * 240 = 6000. Precio final = 3200 + 6000 = 9200
        const filtrado = new Filtrado('2', 'Filtrado Etiopía', 3200, 'Taza grande', 25, 'Etiopía', 240);
        expect(filtrado.calcularPrecio()).toBe(9200);
    });

    it('Debe devolver el precio base para la Pastelería', () => {
        const muffin = new Pasteleria('4', 'Muffin de chocolate', 2500);
        expect(muffin.calcularPrecio()).toBe(2500);
    });

    it('Debe registrar un pedido y calcular correctamente el total y reportes', () => {
    // Creamos un pedido con 2 unidades del producto ID '1' (Expreso Colombia: $7360 c/u)
        const pedido = CafeService.crearPedido([
        { productId: '1', cantidad: 2 }
    ]);

    const totalPedido = CafeService.calcularTotalPedido(pedido);
    expect(totalPedido).toBe(6280 * 2);

    const facturacion = CafeService.obtenerFacturacionTotal();
    expect(facturacion).toBe(6280 * 2);

    const masVendido = CafeService.obtenerProductoMasVendido();
    expect(masVendido.cantidad).toBe(2);
    });

    it('Debe calcular correctamente el precio de un Té en hebras', () => {
    // El Té tiene un precio base de $1500 y no tiene costo extra por preparación
        const te = new Te('6', 'Té en hebras rojo', 1500);
        expect(te.calcularPrecio()).toBe(1500);
    });
});