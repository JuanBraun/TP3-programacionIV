export const obtenerNumeroMesa = (url: string): number | null => {
    // Extraemos los parámetros de la URL
    const params = new URL(url).searchParams;
    const mesa = params.get('mesa');

    // si no hay parámetro "?mesa=", va a la barra (null)
    if (!mesa) return null;

    // convertimos el texto a número
    const numeroMesa = parseInt(mesa, 10);

    // si escribieron texto en vez de número (ej: ?mesa=abc), va a la barra (null)
    if (isNaN(numeroMesa)) return null;

    // si todo está bien, devuelve el número de la mesa
    return numeroMesa;
};