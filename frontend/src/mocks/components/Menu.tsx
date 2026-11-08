import React, { useState } from 'react';

const Menu: React.FC = () => {
    // Definimos el estado inicial: por defecto, arranca cargando
    const [cargando, setCargando] = useState<boolean>(true);

    if (cargando) {
        return (
            <div className="text-center p-5">
                <p className="h4 text-secondary">Cargando menú...</p>
            </div>
        );
    }

    return (
        <div>
            {/* ... */}
        </div>
    );
};

export default Menu;