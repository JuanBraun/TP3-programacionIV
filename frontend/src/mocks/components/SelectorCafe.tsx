import React, { useState } from 'react';
import { Producto } from '../utils/producto';
import { formatearPrecio } from '../utils/precio';

interface SelectorCafeProps {
    productos: Producto[];
}

const SelectorCafe: React.FC<SelectorCafeProps> = ({ productos }) => {
    // Estados para guardar lo que va eligiendo el cliente
    const [bebida, setBebida] = useState('');
    const [tamanio, setTamanio] = useState('');
    const [origen, setOrigen] = useState('');

    // Buscamos si existe un producto que coincida con el tamaño y origen elegidos
    const productoSeleccionado = productos.find(
        (p) => p.tipo === 'expreso' && p.tamanio === tamanio && p.variedad?.nombre === origen
    );

    // El botón se habilita únicamente si los 3 campos tienen un valor
    const listosParaAgregar = bebida !== '' && tamanio !== '' && origen !== '';

    return (
        <div className="card p-4 mb-4 shadow-sm border-0 bg-light">
            <h4 className="mb-3">☕ Personalizá tu Café</h4>
            
            <div className="row g-3">
                <div className="col-md-4">
                    <label htmlFor="select-bebida" className="form-label">Bebida</label>
                    <select id="select-bebida" className="form-select" value={bebida} onChange={e => setBebida(e.target.value)}>
                        <option value="">Elegir...</option>
                        <option value="Expreso">Expreso</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="select-tamanio" className="form-label">Tamaño</label>
                    <select id="select-tamanio" className="form-select" value={tamanio} onChange={e => setTamanio(e.target.value)}>
                        <option value="">Elegir...</option>
                        <option value="Pocillo">Pocillo</option>
                        <option value="Mediano">Mediano</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="select-origen" className="form-label">Origen</label>
                    <select id="select-origen" className="form-select" value={origen} onChange={e => setOrigen(e.target.value)}>
                        <option value="">Elegir...</option>
                        <option value="Colombia">Colombia</option>
                    </select>
                </div>
            </div>

            {/* Muestra la descripción del grano solo si se completaron los filtros y se encontró el producto */}
            {productoSeleccionado && productoSeleccionado.variedad && (
                <div className="alert alert-info mt-3 mb-0">
                    <strong>Origen {productoSeleccionado.variedad.nombre}:</strong> {productoSeleccionado.variedad.descripcion}
                </div>
            )}

            <div className="mt-4 d-flex justify-content-between align-items-center">
                <div>
                    {productoSeleccionado && listosParaAgregar ? (
                        <span className="fs-4 fw-bold text-success">{formatearPrecio(productoSeleccionado.precio)}</span>
                    ) : (
                        <span className="text-muted">Completá las opciones para ver el precio</span>
                    )}
                </div>
                <button className="btn btn-success px-4 fw-bold" disabled={!listosParaAgregar}>
                    Agregar al pedido
                </button>
            </div>
        </div>
    );
};

export default SelectorCafe;