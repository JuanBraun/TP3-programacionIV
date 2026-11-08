import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Producto, productoSchema } from '../utils/producto';
import { formatearPrecio } from '../utils/precio';

const Menu: React.FC = () => {
    const [cargando, setCargando] = useState<boolean>(true);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const buscarProductos = async () => {
            try {
                const respuesta = await fetch('/api/productos');
                if (!respuesta.ok) throw new Error('Error al conectar con la API');

                const datosCrudos = await respuesta.json();
                const validacion = z.array(productoSchema).safeParse(datosCrudos);

                if (!validacion.success) {
                    console.error("DETALLE DE ZOD:", validacion.error.issues);
                    throw new Error('La API envió datos corruptos o con formato incorrecto');
                }

                setProductos(validacion.data);
            } catch (err) {
                console.error("ERROR DETALLADO:", err); //
                setError('Hubo un problema al cargar el menú.');
            } finally {
                setCargando(false);
            }
        };

        buscarProductos();
    }, []);

    if (cargando) {
        return (
            <div className="text-center p-5">
                <p className="h4 text-secondary">Cargando menú...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center m-4">
                {error}
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-center">Menú Disponible</h3>
            <div className="row">
                {/* Iteramos sobre el arreglo de productos para dibujar una tarjeta por cada uno */}
                {productos.map((producto) => (
                    <div key={producto.id} className="col-12 col-md-6 mb-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title mb-1">{producto.nombre}</h5>
                                    <span className="badge bg-secondary text-capitalize">{producto.tipo}</span>
                                </div>
                                {/* Usamos nuestra utilidad pura para mostrar el precio formateado */}
                                <span className="fw-bold fs-5 text-success">
                                    {formatearPrecio(producto.precio)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;