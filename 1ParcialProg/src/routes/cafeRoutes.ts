import { Router } from 'express';
import { CafeController } from '../controllers/cafeController';

const router = Router();
const cafeController = new CafeController();


router.get('/productos', (req, res) => cafeController.getProductos(req, res));
router.get('/productos/:id', (req, res) => cafeController.getProductoPorId(req, res));
router.post('/pedidos', (req, res) => cafeController.crearPedido(req, res));

export default router;
