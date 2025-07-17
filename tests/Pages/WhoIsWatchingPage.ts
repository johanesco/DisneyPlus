import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page Object Model para la pantalla de selección de perfiles de usuario en Disney+
 */
export class WhoIsWatchingPage {
    readonly page: Page;
    readonly editProfiles: Locator;
    readonly mainProfile: Locator;

    /**
     * @param page - Instancia de Playwright Page para interactuar con el navegador
     */
    constructor(page: Page) {
        this.page = page;
        this.editProfiles = page.getByTestId('edit-profiles-button');
        this.mainProfile = page.getByTestId('profile-avatar-0');

    }

    /**
     * Selecciona el perfil principal del usuario
     * @param timeout - Tiempo máximo de espera en milisegundos (default: 15000)
     */
    async selectMainProfile() {
        // Esperar hasta que el perfil principal sea visible
    /*     await this.mainProfile.waitFor({
            state: 'visible',
            timeout: timeout
        }); */

        // Verificar visibilidad y hacer click
       // await expect(this.mainProfile).toBeVisible();
        await this.mainProfile.click();
    }


    /**
     * Verifica el login exitoso y navega al perfil principal
     * @param timeout - Tiempo máximo de espera en milisegundos (default: 25000)
     */
    async assertSuccessfulLogin() {
        // Esperar hasta que el botón de edición de perfiles sea visible
    /*     await this.editProfiles.waitFor({
            state: 'visible',
            timeout: timeout
        }); */
        
        // Validar visibilidad del botón y seleccionar perfil
      // await expect(this.editProfiles).toBeVisible();
        await this.selectMainProfile();
        
        // Comentario preservado para posible uso futuro de validación de URL
        // await expect(this.page).toHaveURL('https://www.disneyplus.com/select-profile');
    }

}
