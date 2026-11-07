import React from 'react';

// Definimos el contrato: qué datos necesita recibir el componente
interface HeaderProps {
    mesa: number | null;
}

const Header: React.FC<HeaderProps> = ({ mesa }) => {
    return (
        <header className="bg-dark text-white p-3 mb-4 text-center">
            <h1>Cafetería Origen</h1>
            <h2 className="h4 text-warning">
                {mesa !== null ? `Mesa: ${mesa}` : 'Retiro en barra'}
            </h2>
        </header>
    );
};

export default Header;