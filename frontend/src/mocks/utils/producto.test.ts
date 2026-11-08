import { describe, it, expect } from 'vitest';
import { productoSchema } from './producto';

describe('Contrato Zod para Productos', () => {
    it('Debe aceptar un producto que tenga todos los campos correctos', () => {
        const productoValido = {
            id: 'prod-123',
            nombre: 'Café de Especialidad',
            precio: 7360,
            categoria: 'bebida'
        };
        
        // safeParse evalúa los datos sin frenar la ejecución si hay error
        const resultado = productoSchema.safeParse(productoValido);
        expect(resultado.success).toBe(true);
    });

    it('Debe rechazar un producto si le faltan datos o son del tipo incorrecto', () => {
        const productoInvalido = {
            nombre: 'Muffin',
            precio: 'quinientos' // Error: es texto en vez de número
            // Error: falta el id y la categoria
        };
        
        const resultado = productoSchema.safeParse(productoInvalido);
        expect(resultado.success).toBe(false);
    });
});