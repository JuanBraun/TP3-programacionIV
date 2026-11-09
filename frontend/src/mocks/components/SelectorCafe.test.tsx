// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import SelectorCafe from './SelectorCafe';

describe('Componente SelectorCafe', () => {
    
    it('Debe renderizar las opciones y mantener el botón "Agregar" deshabilitado inicialmente', () => {
        render(<SelectorCafe productos={[]} />);
        const botonAgregar = screen.getByRole('button', { name: /Agregar/i });
        expect(botonAgregar).toBeDisabled();
    });

    it('Debe habilitar el botón y mostrar el precio y descripción solo al completar los 3 pasos', async () => {
        const user = userEvent.setup();
        
        // Creamos un producto falso basado en la estructura de tu base de datos
        const mockCafes = [
            { 
                id: 1, tipo: 'expreso', nombre: 'Expreso Pocillo', tamanio: 'Pocillo', precio: 6200, 
                variedad: { nombre: 'Colombia', descripcion: 'Acidez media' } 
            }
        ];

        render(<SelectorCafe productos={mockCafes} />);
        const botonAgregar = screen.getByRole('button', { name: /Agregar/i });

        // Simulamos la interacción del cliente con los desplegables
        await user.selectOptions(screen.getByLabelText(/Bebida/i), 'Expreso');
        await user.selectOptions(screen.getByLabelText(/Tamaño/i), 'Pocillo');
        await user.selectOptions(screen.getByLabelText(/Origen/i), 'Colombia');

        // Verificamos que el componente reaccione correctamente
        expect(botonAgregar).toBeEnabled();
        expect(screen.getByText(/\$ 6\.200/i)).toBeInTheDocument();
        expect(screen.getByText(/Acidez media/i)).toBeInTheDocument();
    });

});