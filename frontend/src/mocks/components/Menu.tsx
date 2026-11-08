import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Producto, productoSchema } from '../utils/producto';

const Menu: React.FC = () => {
    const [cargando, setCargando] = useState<boolean>(true);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Esta función asíncrona se ejecuta apenas el componente aparece en pantalla
        const buscarProductos = async () => {
            try {
                // Hacemos el pedido al backend (MSW lo va a interceptar en los tests)
                const respuesta = await fetch('/productos');
                if (!respuesta.ok) throw new Error('Error al conectar con la API');

                const datosCrudos = await respuesta.json();

                // Usamos Zod para validar que sea un array de productos perfectos
                const validacion = z.array(productoSchema).safeParse(datosCrudos);

                if (!validacion.success) {
                    throw new Error('La API envió datos corruptos o con formato incorrecto');
                }

                // Si todo está perfecto, guardamos los productos en el estado
                setProductos(validacion.data);
            } catch (err) {
                setError('Hubo un problema al cargar el menú.');
            } finally {
                // Pase lo que pase (éxito o error), apagamos el cartel de carga
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
            <p className="text-success">¡Menú cargado con éxito! ({productos.length} productos)</p>
            {/* En el próximo paso armaremos la grilla visual de los productos */}
        </div>
    );
};

export default Menu;