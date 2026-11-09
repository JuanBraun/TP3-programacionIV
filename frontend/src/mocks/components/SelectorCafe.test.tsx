// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import SelectorCafe from './SelectorCafe';

describe('Componente SelectorCafe', () => {
    
    it('Debe renderizar las opciones y mantener el botón "Agregar" deshabilitado inicialmente', () => {
        // Le pasamos una lista vacía temporalmente solo para que renderice
        render(<SelectorCafe productos={[]} />);
        
        // Buscamos que el botón de confirmación exista pero esté bloqueado
        const botonAgregar = screen.getByRole('button', { name: /Agregar/i });
        expect(botonAgregar).toBeDisabled();
    });

});