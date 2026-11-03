import { Request, Response } from 'express';
import { CafeService } from '../services/cafeServices';

export class CafeController {


    public getProductos(req: Request, res: Response): void {
        const lista = CafeService.obtenerProductos();
    

        const resultado = lista.map((p: any) => ({
            id: p.id,
            nombre: p.nombre,
            precioBase: p.precioBase,
            precioFinal: p.calcularPrecio()
        }));
    
    res.json(resultado);
    }


    public getProductoPorId(req: Request, res: Response): any {
        const producto = CafeService.obtenerProductoPorId(req.params.id as string);
            if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        }
    
        res.json({
            ...producto,
            precioFinal: producto.calcularPrecio()
        });
    }


    public crearPedido(req: Request, res: Response): any {
        const { items } = req.body; // Espera un array de { productoId, cantidad }
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Items inválidos' });
        }

    const nuevoPedido = CafeService.crearPedido(items);
    const total = CafeService.calcularTotalPedido(nuevoPedido);

    res.status(201).json({
        id: nuevoPedido.id,
        items: nuevoPedido.items,
        estado: nuevoPedido.estado,
        totalPedido: total
    });
    }
}