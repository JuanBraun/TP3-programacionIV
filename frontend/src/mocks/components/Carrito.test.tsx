// @vitest-environment jsdom
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Carrito from './Carrito';

describe('Componente Carrito (Interfaz visual)', () => {
    it('Debe mostrar un mensaje de error y mantener los productos si la API rechaza el pedido', async () => {
        const user = userEvent.setup();
        
        // Falsificamos la función fetch solo para este test simulando un error 400
        const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
            new Response(JSON.stringify({ error: 'Sin stock de café' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        );

        const estadoLleno = { 
            items: [{ productoId: 1, nombre: 'Expreso Pocillo', precio: 6200, cantidad: 1 }], 
            total: 6200 
        };
        
        render(<Carrito estado={estadoLleno} />);
        
        const botonConfirmar = screen.getByRole('button', { name: /Confirmar Pedido/i });
        await user.click(botonConfirmar);
        
        // 1. Exigimos que aparezca el texto del error
        expect(await screen.findByText(/Sin stock de café/i)).toBeInTheDocument();
        
        // 2. Exigimos que el producto siga en la pantalla (no se vació el carrito)
        expect(screen.getByText('Expreso Pocillo')).toBeInTheDocument();
        
        // 3. Exigimos que el botón vuelva a estar clickeable para reintentar
        expect(botonConfirmar).toBeEnabled();

        // Limpiamos el espía para no afectar otros tests
        mockFetch.mockRestore();
    });

    it('Debe enviar el pedido a la API y mostrar el número de seguimiento al tener éxito', async () => {
        const user = userEvent.setup();
        
        // 1. Escenario: El carrito tiene un producto listo para comprar
        const estadoLleno = { 
            items: [{ productoId: 1, nombre: 'Expreso Pocillo', precio: 6200, cantidad: 1 }], 
            total: 6200 
        };
        
        render(<Carrito estado={estadoLleno} />);
        
        // 2. Acción: El cliente hace click en "Confirmar Pedido"
        const botonConfirmar = screen.getByRole('button', { name: /Confirmar Pedido/i });
        await user.click(botonConfirmar);
        
        // 3. Validación: Exigimos que aparezca el número de orden que devuelve tu handlers.ts (id: 1)
        const mensajeExito = await screen.findByText(/Pedido #1/i);
        expect(mensajeExito).toBeInTheDocument();
        
        // Exigimos que el carrito clásico desaparezca de la pantalla para dejarle lugar al seguimiento
        expect(botonConfirmar).not.toBeInTheDocument();
    });

    it('Debe mostrar un mensaje de carrito vacío y tener el botón de confirmar deshabilitado', () => {
        // Simulamos un estado exactamente igual al que nos devuelve el reducer al arrancar
        const estadoVacio = { 
            items: [], 
            total: 0 
        };
        
        // Le pasamos el estado vacío como propiedad (prop) temporalmente para testearlo aislado
        render(<Carrito estado={estadoVacio} />);
        
        // Exigimos que el componente avise que no hay productos
        expect(screen.getByText(/Tu pedido está vacío/i)).toBeInTheDocument();
        
        // Exigimos que el botón de enviar a la cocina esté bloqueado
        const botonConfirmar = screen.getByRole('button', { name: /Confirmar Pedido/i });
        expect(botonConfirmar).toBeDisabled();
    });
});