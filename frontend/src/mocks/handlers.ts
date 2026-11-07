import { http, HttpResponse } from "msw";

export const mockProductos = [
  {
    id: 1,
    tipo: "expreso",
    nombre: "Expreso Pocillo",
    tamanio: "Pocillo",
    gramosCafe: 18,
    variedad: {
      nombre: "Colombia",
      descripcion:
        "Acidez media, cuerpo equilibrado y notas cítricas y florales",
    },
    precio: 6200,
  },
  {
    id: 5,
    tipo: "expreso",
    nombre: "Expreso Mediano",
    tamanio: "Mediano",
    gramosCafe: 27,
    variedad: {
      nombre: "Colombia",
      descripcion:
        "Acidez media, cuerpo equilibrado y notas cítricas y florales",
    },
    precio: 7360,
  },
  {
    id: 10,
    tipo: "pasteleria",
    nombre: "Muffin de chocolate",
    precio: 2500,
  },
  {
    id: 11,
    tipo: "pasteleria",
    nombre: "Torta selva negra",
    precio: 3500,
  },
];

let mockPedidos: Record<number, any> = {};
let pedidoIdCounter = 1;

export const handlers = [
  // GET /productos
  http.get("/api/productos", () => {
    return HttpResponse.json(mockProductos, { status: 200 });
  }),

  // GET /productos/:id
  http.get("/api/productos/:id", ({ params }) => {
    const id = Number(params.id);
    const producto = mockProductos.find((p) => p.id === id);
    if (!producto) {
      return HttpResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }
    return HttpResponse.json(producto, { status: 200 });
  }),

  // POST /pedidos
  http.post("/api/pedidos", async ({ request }) => {
    const body = (await request.json()) as {
      mesaId?: number;
      items: Array<{ id: number; cantidad: number }>;
    };

    if (!body.items || body.items.length === 0) {
      return HttpResponse.json(
        { error: "El pedido debe contener al menos un ítem" },
        { status: 400 },
      );
    }

    let totalCalculado = 0;
    const itemsDetalle = body.items.map((item) => {
      const prod = mockProductos.find((p) => p.id === item.id);
      const subtotal = (prod?.precio || 0) * item.cantidad;
      totalCalculado += subtotal;
      return {
        productoId: item.id,
        nombre: prod?.nombre || "Producto",
        cantidad: item.cantidad,
        precioUnitario: prod?.precio || 0,
        subtotal,
      };
    });

    const nuevoPedido = {
      id: pedidoIdCounter++,
      mesaId: body.mesaId ?? null,
      estado: "pendiente",
      total: totalCalculado,
      items: itemsDetalle,
    };

    mockPedidos[nuevoPedido.id] = nuevoPedido;
    return HttpResponse.json(nuevoPedido, { status: 201 });
  }),

  // GET /pedidos/:id
  http.get("/api/pedidos/:id", ({ params }) => {
    const id = Number(params.id);
    const pedido = mockPedidos[id];
    if (!pedido) {
      return HttpResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 },
      );
    }
    return HttpResponse.json(pedido, { status: 200 });
  }),

  // Endpoints para testing E2E
  http.post("/api/__test__/reset", () => {
    mockPedidos = {};
    pedidoIdCounter = 1;
    return HttpResponse.json(
      { message: "Base de datos de test reiniciada" },
      { status: 200 },
    );
  }),

  http.post("/api/__test__/seed", () => {
    return HttpResponse.json(
      { message: "Datos de prueba sembrados" },
      { status: 200 },
    );
  }),
];
