import React from 'react';
import { EstadoCarrito } from '../reducers/carritoReducer';
import { formatearPrecio } from '../utils/precio';

interface CarritoProps {
    estado: EstadoCarrito;
}

const Carrito: React.FC<CarritoProps> = ({ estado }) => {
    // Variable auxiliar para saber si hay que bloquear cosas
    const estaVacio = estado.items.length === 0;

    return (
        <div className="card shadow-sm border-0 bg-light sticky-top" style={{ top: '20px' }}>
            <div className="card-body p-4">
                <h4 className="card-title mb-4">🛒 Tu Pedido</h4>

                {estaVacio ? (
                    <div className="alert alert-warning text-center text-muted border-0 bg-white">
                        Tu pedido está vacío.<br />¡Agregá algo rico para empezar!
                    </div>
                ) : (
                    <ul className="list-group list-group-flush mb-4 rounded">
                        {estado.items.map((item) => (
                            <li key={item.productoId} className="list-group-item bg-white d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
                                <div>
                                    <h6 className="mb-1 fw-bold">{item.nombre}</h6>
                                    <small className="text-muted">{formatearPrecio(item.precio)} x {item.cantidad}</small>
                                </div>
                                <span className="fw-bold">{formatearPrecio(item.precio * item.cantidad)}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                    <span className="fs-5 text-muted">Total:</span>
                    <span className="fs-3 fw-bold text-success">
                        {formatearPrecio(estado.total)}
                    </span>
                </div>

                <button 
                    className="btn btn-primary w-100 py-3 fw-bold fs-5 shadow-sm" 
                    disabled={estaVacio}
                >
                    Confirmar Pedido
                </button>
            </div>
        </div>
    );
};

export default Carrito;