import React from 'react';
import { Producto } from '../utils/producto';
import { formatearPrecio } from '../utils/precio';

interface PasteleriaProps {
    productos: Producto[];
}

const Pasteleria: React.FC<PasteleriaProps> = ({ productos }) => {
    // Filtramos la lista para asegurarnos de dibujar SOLO la pastelería
    const productosDulces = productos.filter((p) => p.tipo === 'pasteleria');

    return (
        <div className="mb-4">
            <h4 className="mb-3">🍰 Acompañá tu pedido</h4>
            <div className="row g-3">
                {productosDulces.map((prod) => (
                    <div key={prod.id} className="col-12 col-md-6">
                        <div className="card shadow-sm border-0 bg-light h-100">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title mb-1">{prod.nombre}</h5>
                                    <span className="fw-bold text-success fs-5">
                                        {formatearPrecio(prod.precio)}
                                    </span>
                                </div>
                                <button className="btn btn-outline-success fw-bold px-3">
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pasteleria;