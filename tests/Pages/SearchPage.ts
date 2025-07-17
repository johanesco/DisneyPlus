import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page Object Model para la pantalla de búsqueda de Disney+
 */
export class SearchPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly movie: 'DeadPool';
    readonly resultadoBusqueda: Locator;

    /**
     * Configura los elementos de la pantalla de búsqueda
     * @param page - Instancia de Playwright Page
     */
    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByPlaceholder('Search by title, genre, team');
        this.resultadoBusqueda = page.getByRole('link', { name: 'Deadpool & Wolverine Rated 18' });

    }


    /**
     * Realiza una búsqueda de contenido
     * @param movie - Título a buscar
     */
    async SearchInput(movie:string){
        // Interactuar con el campo de búsqueda
        await this.searchBox.click();
        await expect(this.searchBox).toBeEditable();
        await this.searchBox.fill(movie);
    }

    /**
     * Valida que se muestren resultados de búsqueda
     */
    async AssertResultadoBusqueda(){
        await expect(this.resultadoBusqueda).toBeVisible();
    }



}
