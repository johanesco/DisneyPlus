import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page Object Model para la pantalla de login de Disney+
 */
export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly ContinueButton: Locator;
    readonly LoginButton: Locator;
    readonly errorMessage: Locator;
    readonly editProfiles: Locator;
    readonly emailInputEmpty: Locator;
    readonly errorPassword: Locator;

    /**
     * @param page - Instancia de Playwright Page para control del navegador
     */
    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.errorMessage = page.getByTestId('error-message');
        this.ContinueButton = page.getByTestId('continue-btn');
        this.LoginButton = page.getByRole('button', { name: 'Log In' });
        this.emailInputEmpty = page.getByText('This email isn\'t properly');
        this.errorPassword = page.getByText('We couldn\'t log you in.');

    }


    /**
     * Navega a la página de login y verifica carga inicial
     */
    async navigateToLogin() {
        // Navegar a URL de login
        await this.page.goto('https://www.disneyplus.com/identity/login/enter-email');
        
        // Validar que el campo de email está visible
        await expect(this.emailInput).toBeVisible();
    }

    /**
     * Ingresa el email en el campo correspondiente
     * @param email - Email del usuario a ingresar
     */
    async performEmail(email: string) {
        await this.emailInput.fill(email);
    }

    /**
     * Ingresa la contraseña en el campo correspondiente
     * @param password - Contraseña del usuario a ingresar
     */
    async performPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    /**
     * Haz click en el botón "Continue" después de ingresar email
     */
    async clickContinueButton() {
        await this.ContinueButton.click();
        await this.page.waitForURL(/enter-password/);
    }

    /**
     * Haz click en el botón "Log In" después de ingresar contraseña
     */
    async clickLoginButton() {
        await this.LoginButton.click();
        //await this.page.waitForLoadState('networkidle');
    }


    /**
     * Valida que se muestra el error por email vacío/inválido
     */
    async assertSuccessfulErrorMessageEmailEmpty() {
        await expect(this.emailInputEmpty).toBeVisible();
    }

    /**
     * Valida que se muestra el error por credenciales incorrectas
     */
    async assertSuccessfulErrorMessagePassword() {
        await expect(this.errorPassword, 'El mensaje de error no aparece o no es el esperado').toBeVisible();
    }


    /**
     * Flujo completo de login con email y contraseña
     * @param email - Email del usuario
     * @param password - Contraseña del usuario
     */
    async login(email: string, password: string) {
        await this.performEmail(email);
        await this.clickContinueButton();
        await this.performPassword(password);
        await this.clickLoginButton();
    }



}
