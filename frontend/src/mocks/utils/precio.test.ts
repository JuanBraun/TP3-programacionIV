import { describe, it, expect } from 'vitest';
import { formatearPrecio } from './precio';

describe('Formateador de precios', () => {
    it('Debe formatear un número agregando el signo $ y el punto de miles', () => {
        expect(formatearPrecio(7360)).toBe('$7.360');
        expect(formatearPrecio(12500)).toBe('$12.500');
    });

    it('Debe devolver $0 si recibe un cero', () => {
        expect(formatearPrecio(0)).toBe('$0');
    });
});