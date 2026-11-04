import { Request, Response } from 'express';
import { CafeService } from '../services/cafeServices';

export class CafeController {
  
  // GET /api/productos -> Devuelve precio y tipo según el contrato del TP3
  public getProductos = (req: Request, res: Response): void => {
    try {
      const productos = CafeService.obtenerProductos();
      const resultado = productos.map((p: any) => ({
        id: p.id,
        tipo: p.tipo, // Asegurar que el modelo devuelva el tipo ('expreso', 'filtrado', 'pasteleria')
        nombre: p.nombre,
        tamanio: p.tamanio,
        gramosCafe: p.gramosCafe,
        variedad: p.variedad,
        precio: p.calcularPrecio() // Contrato exige 'precio'
      }));
      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  };

  // GET /api/productos/:id
  public getProductoPorId = (req: Request, res: Response): void => {
    try {
      const id = req.params.id; // Mantener como string o ajustar según tu servicio
      const producto = CafeService.obtenerProductoPorId(id);
      
      if (!producto) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.json({
        id: producto.id,
        tipo: producto.tipo,
        nombre: producto.nombre,
        tamanio: producto.tamanio,
        gramosCafe: producto.gramosCafe,
        variedad: producto.variedad,
        precio: producto.calcularPrecio()
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  };

  // POST /pedidos -> Acepta mesaId opcional y lo devuelve
  public crearPedido = (req: Request, res: Response): void => {
    try {
      const { items, mesaId } = req.body; // Recibimos mesaId del body

      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: 'Debes enviar una lista de ítems válida' });
        return;
      }

      const nuevoPedido = CafeService.crearPedido(items, mesaId);
      const total = CafeService.calcularTotalPedido(nuevoPedido);

      res.status(201).json({
        id: nuevoPedido.id,
        mesaId: nuevoPedido.mesaId ?? null, // Devuelve la mesa asignada
        items: nuevoPedido.items,
        estado: nuevoPedido.estado,
        total: total
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error al procesar el pedido' });
    }
  };

  // GET /pedidos
  public getPedidos = (req: Request, res: Response): void => {
    try {
      const pedidos = CafeService.obtenerPedidos();
      const resultado = pedidos.map((pedido: any) => ({
        id: pedido.id,
        mesaId: pedido.mesaId ?? null,
        items: pedido.items,
        estado: pedido.estado,
        total: CafeService.calcularTotalPedido(pedido)
      }));
      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
  };

  // GET /pedidos/:id
  public getPedidoPorId = (req: Request, res: Response): void => {
    try {
      const id = req.params.id;
      const pedido = CafeService.obtenerPedidoPorId(id);

      if (!pedido) {
        res.status(404).json({ error: 'Pedido no encontrado' });
        return;
      }

      res.json({
        id: pedido.id,
        mesaId: pedido.mesaId ?? null,
        items: pedido.items,
        estado: pedido.estado,
        total: CafeService.calcularTotalPedido(pedido)
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener el pedido' });
    }
  };

  // GET /reportes/facturacion
  public getFacturacionTotal = (req: Request, res: Response): void => {
    try {
      const total = CafeService.obtenerFacturacionTotal();
      res.json({ facturacionTotal: total });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al calcular la facturación total' });
    }
  };

  // GET /reportes/mas-vendido
  public getProductoMasVendido = (req: Request, res: Response): void => {
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
  };
}