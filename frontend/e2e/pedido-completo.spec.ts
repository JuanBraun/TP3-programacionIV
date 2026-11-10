import { test, expect } from '@playwright/test';

// Asegurate de que este puerto coincida con el que usa Vite al correr 'npm run dev'
const BASE_URL = 'http://localhost:5173';

test.describe('Flujo de compra de la cafetería', () => {

    test.beforeEach(async ({ request }) => {
        // 1. Llamamos al endpoint de reseteo para arrancar con la base de datos limpia
        await request.post(`${BASE_URL}/api/__test__/reset`);
    });

    test('Debe armar un café, agregar un muffin, confirmar y ver el ID del pedido', async ({ page }) => {
        // 2. Entrar a la página principal
        await page.goto(BASE_URL);

        // 3. Armar un café en el selector interactuando con los <select>
        await page.locator('#select-bebida').selectOption('Expresvo');
        await page.locator('#select-tamanio').selectOption('Pocillo');
        await page.locator('#select-origen').selectOption('Colombia');

        // Hacemos clic en el botón de agregar del panel de café
        await page.getByRole('button', { name: 'Agregar al pedido' }).click();

        // 4. Agregar un muffin de la sección de pastelería
        const tarjetaMuffin = page.locator('.card', { hasText: 'Muffin de chocolate' });
        await tarjetaMuffin.getByRole('button', { name: /Agregar/i }).click();

        // 5. Mandar el pedido desde el carrito
        await page.getByRole('button', { name: 'Confirmar Pedido' }).click();

        // 6. Validar que la pantalla final muestre el ID y el estado correctamente
        await expect(page.getByText(/¡Pedido Confirmado!/i)).toBeVisible();
        await expect(page.getByText(/Pedido #1/i)).toBeVisible();
        await expect(page.getByText(/Estado: pendiente/i)).toBeVisible();
    });
});