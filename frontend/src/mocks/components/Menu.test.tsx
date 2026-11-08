// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Menu from './Menu';

describe('Componente Menu (Llamada a la API)', () => {
    
    it('Debe mostrar el estado de "Cargando menú..." al montarse inicialmente', () => {
        render(<Menu />);
        // Buscamos que el texto de carga exista en la pantalla apenas se abre
        expect(screen.getByText('Cargando menú...')).toBeInTheDocument();
    });

    it('Debe quitar el cartel de carga y mostrar los productos al recibir la respuesta', async () => {
        render(<Menu />);

        // El componente arranca diciendo "Cargando menú..."
        expect(screen.getByText('Cargando menú...')).toBeInTheDocument();

        // waitFor simula la espera del cliente. Reintenta la comprobación durante 1 segundo.
        await waitFor(() => {
            // Buscamos que el texto de carga ya NO esté en la pantalla (not.toBeInTheDocument)
            expect(screen.queryByText('Cargando menú...')).not.toBeInTheDocument();
        });
    });

    it('Debe renderizar los nombres de los productos en pantalla', async () => {
        render(<Menu />);

        // findByText ya incluye el waitFor internamente, es ideal para buscar datos asíncronos
        // Usamos una expresión regular (/Café/i) para que encuentre la palabra sin importar mayúsculas o minúsculas
        const productoNombre = await screen.findByText(/Café/i);
        
        expect(productoNombre).toBeInTheDocument();
    });

});