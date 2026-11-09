import React from 'react';
import { Producto } from '../utils/producto';

interface SelectorCafeProps {
    productos: Producto[];
}

const SelectorCafe: React.FC<SelectorCafeProps> = ({ productos }) => {
    return (
        <div className="card p-4 mb-4 shadow-sm border-0 bg-light">
            <h4 className="mb-3">☕ Personalizá tu Café</h4>
            
            {}

            <div className="mt-4 text-end">
                <button className="btn btn-success px-4 fw-bold" disabled>
                    Agregar al pedido
                </button>
            </div>
        </div>
    );
};

export default SelectorCafe;