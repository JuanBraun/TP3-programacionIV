import { Router } from 'express';
import { CafeController } from '../controllers/cafeController';

const router = Router();
const cafeController = new CafeController();

// Rutas de Productos
router.get('/productos', (req, res) => cafeController.getProductos(req, res));
router.get('/productos/:id', (req, res) => cafeController.getProductoPorId(req, res));

// Rutas de Pedidos
router.post('/pedidos', (req, res) => cafeController.crearPedido(req, res));
router.get('/pedidos', (req, res) => cafeController.getPedidos(req, res));
router.get('/pedidos/:id', (req, res) => cafeController.getPedidoPorId(req, res));

// Rutas de Reportes
router.get('/reportes/facturacion', (req, res) => cafeController.getFacturacionTotal(req, res));
router.get('/reportes/mas-vendido', (req, res) => cafeController.getProductoMasVendido(req, res));

export default router;