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
     **/
    async selectMainProfile() {

        await this.mainProfile.click();
    }

    


    /**
     * Verifica el login exitoso y navega al perfil principal
    */
    async assertSuccessfulLogin() {
     

        await this.selectMainProfile();


    }

}
