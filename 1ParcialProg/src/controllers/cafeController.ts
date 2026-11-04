import { Request, Response } from 'express';
import { CafeService } from '../services/cafeServices';

export class CafeController {
  // GET /api/productos -> Obtener todos los productos con su precio final
  public getProductos(req: Request, res: Response): void {
    try {
      const productos = CafeService.obtenerProductos();
      const resultado = productos.map((p: any) => ({
        id: p.id,
        nombre: p.nombre,
        precioBase: p.precioBase,
        precioFinal: p.calcularPrecio()
      }));
      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }

  // GET /api/productos/:id -> Obtener un producto por ID con su precio final
  public getProductoPorId(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'El ID del producto debe ser un número válido' });
        return;
      }

      const producto = CafeService.obtenerProductoPorId(id);
      if (!producto) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.json({
        ...producto,
        precioFinal: producto.calcularPrecio()
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }

  // POST /api/pedidos -> Crear un nuevo pedido
  public crearPedido(req: Request, res: Response): void {
    try {
      const { items } = req.body; // Array esperado: [{ productoId: 1, cantidad: 2 }, ...]

      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: 'Debes enviar una lista de items válida' });
        return;
      }

      const nuevoPedido = CafeService.crearPedido(items);
      const total = CafeService.calcularTotalPedido(nuevoPedido);

      res.status(201).json({
        id: nuevoPedido.id,
        items: nuevoPedido.items,
        estado: nuevoPedido.estado,
        totalPedido: total
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al procesar el pedido' });
    }
  }

  // GET /api/pedidos -> Listar todos los pedidos
  public getPedidos(req: Request, res: Response): void {
    try {
      const pedidos = CafeService.obtenerPedidos();
      const resultado = pedidos.map((pedido: any) => ({
        id: pedido.id,
        items: pedido.items,
        estado: pedido.estado,
        totalPedido: CafeService.calcularTotalPedido(pedido)
      }));
      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
  }

  // GET /api/pedidos/:id -> Obtener un pedido específico por ID
  public getPedidoPorId(req: Request, res: Response): void {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'El ID del pedido debe ser un número válido' });
        return;
      }

      const pedido = CafeService.obtenerPedidoPorId(id);
      if (!pedido) {
        res.status(404).json({ error: 'Pedido no encontrado' });
        return;
      }

      res.json({
        id: pedido.id,
        items: pedido.items,
        estado: pedido.estado,
        totalPedido: CafeService.calcularTotalPedido(pedido)
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener el pedido' });
    }
  }

  // GET /api/reportes/facturacion -> Total facturado en la cafetería
  public getFacturacionTotal(req: Request, res: Response): void {
    try {
      const total = CafeService.obtenerFacturacionTotal();
      res.json({ facturacionTotal: total });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al calcular la facturación total' });
    }
  }

  // GET /api/reportes/mas-vendido -> Producto más vendido
  public getProductoMasVendido(req: Request, res: Response): void {
    try {
      const masVendido = CafeService.obtenerProductoMasVendido();
      if (!masVendido) {
        res.json({ mensaje: 'No hay ventas registradas aún', producto: null });
        return;
      }
      res.json(masVendido);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener el producto más vendido' });
    }
  }
}