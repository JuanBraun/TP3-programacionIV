import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Componente Header', () => {
    it('Debe mostrar el número de mesa si recibe un número', () => {
        render(<Header mesa={4} />);
        expect(screen.getByText('Mesa: 4')).toBeInTheDocument();
    });

    it('Debe mostrar "Retiro en barra" si la mesa es null', () => {
        render(<Header mesa={null} />);
        expect(screen.getByText('Retiro en barra')).toBeInTheDocument();
    });
});