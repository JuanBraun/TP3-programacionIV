import React, { useState } from 'react';
import { EstadoCarrito } from '../reducers/carritoReducer';
import { formatearPrecio } from '../utils/precio';

interface CarritoProps {
    estado: EstadoCarrito;
}

const Carrito: React.FC<CarritoProps> = ({ estado }) => {
    const estaVacio = estado.items.length === 0;
    
    // Estados nuevos para manejar la red y la respuesta de MSW
    const [cargando, setCargando] = useState(false);
    // Usamos 'any' temporalmente para la orden, luego podemos tiparlo
    const [orden, setOrden] = useState<any>(null); 

    const confirmarPedido = async () => {
        setCargando(true);
        try {
            // Tu API espera { id, cantidad } según tu handlers.ts
            const itemsApi = estado.items.map(item => ({
                id: item.productoId,
                cantidad: item.cantidad
            }));

            const respuesta = await fetch('/api/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: itemsApi })
            });

            if (respuesta.ok) {
                const data = await respuesta.json();
                setOrden(data); // Guardamos la orden confirmada
            }
        } catch (error) {
            console.error("Error de red:", error);
        } finally {
            setCargando(false);
        }
    };

    // Si tenemos una orden exitosa, la pantalla se transforma en el panel de seguimiento
    if (orden) {
        return (
            <div className="card shadow-sm border-0 bg-light sticky-top" style={{ top: '20px' }}>
                <div className="card-body p-4 text-center">
                    <div className="text-success mb-3" style={{ fontSize: '3rem' }}>✓</div>
                    <h4 className="card-title mb-2">¡Pedido Confirmado!</h4>
                    <h2 className="display-6 fw-bold mb-3">Pedido #{orden.id}</h2>
                    <span className="badge bg-warning text-dark fs-6 mb-4 text-capitalize">
                        Estado: {orden.estado}
                    </span>
                    <p className="text-muted">
                        Tu pedido fue enviado a la cocina. Te avisaremos cuando esté listo.
                    </p>
                </div>
            </div>
        );
    }

    // Si no hay orden confirmada todavía, mostramos el carrito normal
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
                    disabled={estaVacio || cargando}
                    onClick={confirmarPedido}
                >
                    {cargando ? 'Enviando...' : 'Confirmar Pedido'}
                </button>
            </div>
        </div>
    );
};

export default Carrito;