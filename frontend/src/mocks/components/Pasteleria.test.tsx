// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Pasteleria from './Pasteleria';

describe('Componente Pasteleria', () => {
    it('Debe renderizar las tarjetas con sus nombres y botones de agregar habilitados', () => {
        // Simulamos los datos exactos que devuelve tu backend
        const mockPasteleria = [
            { id: 10, tipo: 'pasteleria', nombre: 'Muffin de chocolate', precio: 2500 },
            { id: 11, tipo: 'pasteleria', nombre: 'Torta selva negra', precio: 3500 }
        ];

        render(<Pasteleria productos={mockPasteleria} />);

        // 1. Verificamos que los nombres se rendericen en pantalla
        expect(screen.getByText(/Muffin de chocolate/i)).toBeInTheDocument();
        expect(screen.getByText(/Torta selva negra/i)).toBeInTheDocument();

        // 2. Buscamos TODOS los botones que digan "Agregar"
        const botonesAgregar = screen.getAllByRole('button', { name: /Agregar/i });
        
        // Exigimos que haya exactamente 2 botones (uno para cada producto)
        expect(botonesAgregar).toHaveLength(2);
        
        // Exigimos que ambos botones estén clickeables (no bloqueados como en el café)
        expect(botonesAgregar[0]).toBeEnabled();
        expect(botonesAgregar[1]).toBeEnabled();
    });
});