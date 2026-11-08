// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Menu from './Menu';

describe('Componente Menu (llamada a la API)', () => {
    it('Debe mostrar el estado de "Cargando menú..." al montarse inicialmente', () => {
        render(<Menu />);
        // Buscamos que el texto de carga exista en la pantalla apenas se abre
        expect(screen.getByText('Cargando menú...')).toBeInTheDocument();
    });
});