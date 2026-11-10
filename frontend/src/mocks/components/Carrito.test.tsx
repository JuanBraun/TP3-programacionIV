// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Carrito from './Carrito';

describe('Componente Carrito (Interfaz visual)', () => {
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