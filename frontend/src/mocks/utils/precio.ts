export const formatearPrecio = (precio: number): string => {
    // Usamos toLocaleString con 'es-AR' para que automáticamente ponga el punto en los miles
    return '$' + precio.toLocaleString('es-AR');
};