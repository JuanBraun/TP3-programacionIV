import { test, expect } from '@playwright/test';

test.describe('Flujo de compra de la cafetería', () => {
    test.beforeEach(async ({ request }) => {
        await request.post('/api/__test__/reset');
    });

    test('Debe armar un café, agregar un muffin, confirmar y ver el pedido', async ({ page }) => {
        await page.goto('/');

        await page.locator('#select-bebida').selectOption('Expreso');
        await page.locator('#select-tamanio').selectOption('Pocillo');
        await page.locator('#select-origen').selectOption('Colombia');

        await page.getByRole('button', { name: 'Agregar al pedido' }).click();

        const tarjetaMuffin = page.locator('.card', {
            hasText: 'Muffin de chocolate'
        });

        await tarjetaMuffin.getByRole('button', { name: /Agregar/i }).click();

        await page.getByRole('button', { name: 'Confirmar Pedido' }).click();

        await expect(page.getByText(/¡Pedido Confirmado!/i)).toBeVisible();
        await expect(page.getByText(/Pedido #/i)).toBeVisible();
        await expect(page.getByText(/Estado: pendiente/i)).toBeVisible();
    });
});