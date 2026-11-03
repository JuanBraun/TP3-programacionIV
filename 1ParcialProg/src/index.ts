import express from 'express';
import cafeRoutes from './app';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en las peticiones (como los POST /pedidos)
app.use(express.json());

// Usamos las rutas definidas en app.ts
app.use('/', cafeRoutes);

app.listen(PORT, () => {
    console.log(`Servidor de la Cafetería Origen corriendo en http://localhost:${PORT}`);
});