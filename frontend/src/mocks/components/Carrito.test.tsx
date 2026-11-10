// @vitest-environment jsdom
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import Carrito from './Carrito';

describe('Componente Carrito (Interfaz visual)', () => {
    
    // Limpiamos los espías y el reloj después de CADA test para que no se contaminen entre sí
    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('Debe mostrar un mensaje de carrito vacío y tener el botón de confirmar deshabilitado', () => {
        const estadoVacio = { items: [], total: 0 };
        render(<Carrito estado={estadoVacio} />);
        expect(screen.getByText(/Tu pedido está vacío/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Confirmar Pedido/i })).toBeDisabled();
    });

    it('Debe enviar el pedido a la API y mostrar el número de seguimiento al tener éxito', async () => {
        // Mockeamos la respuesta de forma directa sin usar 'new Response()'
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1, estado: 'pendiente' })
        } as any);

        const estadoLleno = { 
            items: [{ productoId: 1, nombre: 'Expreso Pocillo', precio: 6200, cantidad: 1 }], total: 6200 
        };
        render(<Carrito estado={estadoLleno} />);
        
        // Usamos fireEvent que es sincrónico y no se cuelga
        fireEvent.click(screen.getByRole('button', { name: /Confirmar Pedido/i }));
        
        expect(await screen.findByText(/Pedido #1/i)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Confirmar Pedido/i })).not.toBeInTheDocument();
    });

    it('Debe mostrar un mensaje de error y mantener los productos si la API rechaza el pedido', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Sin stock de café' })
        } as any);

        const estadoLleno = { 
            items: [{ productoId: 1, nombre: 'Expreso Pocillo', precio: 6200, cantidad: 1 }], total: 6200 
        };
        render(<Carrito estado={estadoLleno} />);
        
        fireEvent.click(screen.getByRole('button', { name: /Confirmar Pedido/i }));
        
        expect(await screen.findByText(/Sin stock de café/i)).toBeInTheDocument();
        expect(screen.getByText('Expreso Pocillo')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Confirmar Pedido/i })).toBeEnabled();
    });

    it('Debe consultar el estado periódicamente (polling) y actualizar la pantalla sola', async () => {
        vi.useFakeTimers();
        
        vi.spyOn(global, 'fetch').mockImplementation(async (url, options) => {
            if (options?.method === 'POST') {
                return { ok: true, json: async () => ({ id: 1, estado: 'pendiente' }) } as any;
            }
            return { ok: true, json: async () => ({ id: 1, estado: 'entregado' }) } as any;
        });

        const estadoLleno = { 
            items: [{ productoId: 1, nombre: 'Expreso Pocillo', precio: 6200, cantidad: 1 }], total: 6200 
        };
        render(<Carrito estado={estadoLleno} />);
        
        fireEvent.click(screen.getByRole('button', { name: /Confirmar Pedido/i }));
        
        // 1. Damos un pequeño empujón al reloj falso dentro de act() para que se resuelva el POST
        await act(async () => {
            await vi.advanceTimersByTimeAsync(1);
        });
        
        // 2. Usamos getByText (sincrónico) porque sabemos que ya está renderizado
        expect(screen.getByText(/Estado: pendiente/i)).toBeInTheDocument();
        
        // 3. Avanzamos el reloj 5 segundos dentro de act() para disparar el setInterval
        await act(async () => {
            await vi.advanceTimersByTimeAsync(5000);
        });
        
        // 4. Verificamos la actualización
        expect(screen.getByText(/Estado: entregado/i)).toBeInTheDocument();
    });
});