import { z } from 'zod';

// Definimos el contrato de validación estricto
export const productoSchema = z.object({
    id: z.number(), // 
    nombre: z.string(),
    precio: z.number(),
    tipo: z.string()
});

// Extraemos el tipo de TypeScript automáticamente desde el esquema
// Esto nos sirve para usarlo en los componentes de React sin reescribir todo
export type Producto = z.infer<typeof productoSchema>;