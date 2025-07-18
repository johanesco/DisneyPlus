import { expect, type Locator, type Page } from '@playwright/test';


/**
 * Page Object Model para la página principal de Disney+
 */
export class HomePage {
    readonly page: Page;
    readonly homeBtn: Locator;
    readonly recommendedForYou: Locator;
    readonly continueWatching: Locator;
    readonly top10: Locator;
    readonly searchBtn: Locator;
    readonly watchListBtn: Locator;
    readonly espnBtn: Locator;
    readonly moviesBtn: Locator;
    readonly seriesBtn: Locator;
    readonly originalsBtn: Locator;
    readonly closeOnboardingBanner: Locator;

    /**
     * Configura los locators para los elementos principales de la página
     * @param page - Instancia de Playwright Page
     */
    constructor(page: Page) {
        this.page = page;
        this.homeBtn = page.getByTestId('navigation-item-0-HOME');
        this.recommendedForYou = page.getByRole('heading', { name: 'Recommended For You' });
        this.continueWatching = page.getByRole('heading', { name: 'Continue Watching' });
        this.top10 = page.getByRole('heading', { name: 'Top 10' });
        this.searchBtn = page.getByTestId('navigation-item-1-SEARCH');
        this.watchListBtn = page.getByTestId('navigation-item-2-WATCHLIST');
        this.espnBtn = page.getByTestId('navigation-item-3-ESPN');
        this.moviesBtn = page.getByTestId('navigation-item-4-MOVIES');
        this.seriesBtn = page.getByTestId('navigation-item-5-SERIES');
        this.originalsBtn = page.getByTestId('navigation-item-6-ORIGINALS');
        this.closeOnboardingBanner = page.getByTestId('welch-onboarding-banner-closeIcon').locator('path');


    }


    /**
     * Verifica que el botón de Home esté visible
     */
    async homeButton() {
        await this.homeBtn.waitFor({ state: "visible", timeout: 15000 });
        await expect(this.homeBtn).toBeVisible();
    }

    /**
     * Verifica que el botón de Búsqueda esté visible
     */
    async searchButton() {
        await expect(this.searchBtn).toBeVisible();
    }

    /**
     * Verifica que el botón de Watchlist esté visible
     */
    async watchListButton() {
        await expect(this.watchListBtn).toBeVisible();
    }

    /**
     * Verifica que el botón de ESPN esté visible
     */
    async espnButton() {
        await expect(this.espnBtn).toBeVisible();
    }

    /**
     * Verifica que el botón de Películas esté visible
     */
    async moviesButton() {
        await expect(this.moviesBtn).toBeVisible();
    }

    /**
     * Verifica que el botón de Series esté visible
     */
    async seriesButton() {
        await expect(this.seriesBtn).toBeVisible();
    }

    /**
     * Verifica que el botón de Originales esté visible
     */
    async originalsButton() {
        await expect(this.originalsBtn).toBeVisible();
    }

    /**
        * Cierra el botón del banner de onboarding inicial
        */
    async closeBanner() {
        await expect(this.closeOnboardingBanner).toBeVisible();
    }


    /**
     * Valida la sección "Recomendado para ti"
     */
    async AssertRecommendedForYou() {
        await this.page.reload();
        let recommendedForYouVisible = false;

        // Intentar hasta 5 veces encontrar la sección con scroll
        for (let attempt = 0; attempt < 5 && !recommendedForYouVisible; attempt++) {
            recommendedForYouVisible = await this.continueWatching.isVisible();

            if (!recommendedForYouVisible) {
                // Scroll de una página hacia abajo
                await this.page.evaluate(() => {
                    window.scrollBy(0, window.innerHeight);
                });

                // Esperar carga de contenido
                await this.page.waitForTimeout(1000);
            }
        }

        await expect(this.recommendedForYou).toBeVisible();
    }


    /**
     * Valida la sección "Continuar viendo" con scroll automático
     * @remarks Implementa scroll hasta encontrar la sección
     */
    async AssertContinueWatching() {
        await this.page.reload();
        let continueWatchingVisible = false;

        // Intentar hasta 5 veces encontrar la sección con scroll
        for (let attempt = 0; attempt < 5 && !continueWatchingVisible; attempt++) {
            continueWatchingVisible = await this.continueWatching.isVisible();

            if (!continueWatchingVisible) {
                // Scroll de una página hacia abajo
                await this.page.evaluate(() => {
                    window.scrollBy(0, window.innerHeight);
                });

                // Esperar carga de contenido
                await this.page.waitForTimeout(1000);
            }
        }

        // Validar visibilidad final
        await expect(this.continueWatching).toBeVisible();
    }

    /**
     * Valida la sección "Top 10" con scroll automático
     * @remarks Implementa scroll hasta encontrar la sección
     */
    async AssertTop10() {
        await this.page.reload();
        let top10Visible = false;

        // Intentar hasta 5 veces encontrar la sección con scroll
        for (let attempt = 0; attempt < 5 && !top10Visible; attempt++) {
            top10Visible = await this.top10.isVisible();

            if (!top10Visible) {
                // Scroll de una página hacia abajo
                await this.page.evaluate(() => {
                    window.scrollBy(0, window.innerHeight);
                });

                // Esperar carga de contenido
                await this.page.waitForTimeout(1000);
            }
        }

        // Validar visibilidad final
        await expect(this.top10).toBeVisible();
    }



}
