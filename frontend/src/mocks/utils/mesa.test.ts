import { describe, it, expect } from 'vitest';
import { obtenerNumeroMesa } from './mesa';

describe('Lectura de mesa desde QR (URL)', () => {
    it('Debe devolver el número 4 si la URL tiene ?mesa=4', () => {
        const url = 'http://localhost:5173/?mesa=4';
        expect(obtenerNumeroMesa(url)).toBe(4);
    });

    it('Debe devolver null (pedido en barra) si no hay parámetro mesa', () => {
        const url = 'http://localhost:5173/';
        expect(obtenerNumeroMesa(url)).toBeNull();
    });

    it('Debe devolver null (pedido en barra) si el valor de la mesa es inválido', () => {
        const url = 'http://localhost:5173/?mesa=abc';
        expect(obtenerNumeroMesa(url)).toBeNull();
    });
});