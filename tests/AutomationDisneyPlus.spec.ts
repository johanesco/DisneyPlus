import { test, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from './Pages/LoginPage';
import { WhoIsWatchingPage } from './Pages/WhoIsWatchingPage';
import { HomePage } from './Pages/HomePage';
import { SearchPage } from './Pages/SearchPage';

/**
 * Suite principal de pruebas de automatización para Disney+
 * @remarks Incluye flujos de autenticación, navegación y búsqueda
 */
(async () => {
    let browser: Browser;
    let page: Page;

    // Configuración de credenciales de prueba
    // NOTA: Reemplazar con datos de prueba válidos
    const email = 'disney.bot@disneyplustesting.com';
    const pass = 'Test123!';
    const wrongPass = 'Test';



    /**
     * Suite de pruebas para el flujo de autenticación
     * @includes Pruebas de login exitoso y casos de error
     */
    test.describe.only('Validaciones de inicio de sesión en Disney+', () => {

        /**
         * Configuración inicial para cada prueba de login
         * @remarks Navega a la página de login antes de cada test
         */
        test.beforeEach('Navegación inicial a pantalla de login', async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigateToLogin();

        });

        /**
         * Prueba de login exitoso con credenciales válidas
         * @param page - Instancia de Playwright Page
         */
        test('Login exitoso con credenciales válidas', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const whoIsWatchingPage = new WhoIsWatchingPage(page);

            /**
             * Flujo completo de autenticación válida
             * @steps 1. Ingreso de credenciales
             *        2. Validación de redirección
             */
            await test.step('Completar flujo de autenticación válida', async () => {
                const loginPage = new LoginPage(page);

                await loginPage.login(email, pass);
                await whoIsWatchingPage.assertSuccessfulLogin();

            })

        })


        /**
         * Prueba de validación de campo email requerido
         * @param page - Instancia de Playwright Page
         */
        test('Validar error con email vacío', async ({ page }) => {
            const loginPage = new LoginPage(page);

            /**
             * Intento de login sin proveer email
             * @expected Debe mostrar mensaje de error
             */
            await test.step('Intento de login sin email', async () => {

                await loginPage.ContinueButton.click();
                await loginPage.assertSuccessfulErrorMessageEmailEmpty();
            })


        })

        /**
         * Prueba de error con contraseña incorrecta
         * @param page - Instancia de Playwright Page
         */
        test('Validar error con contraseña inválida', async ({ page }) => {
            const loginPage = new LoginPage(page);

            /**
             * Flujo con credenciales inválidas
             * @steps 1. Ingresar email válido
             *        2. Ingresar contraseña incorrecta
             * @expected Debe mostrar mensaje de error
             */
            await test.step('Ejecutar flujo con contraseña errónea', async () => {
                await loginPage.performEmail(email);
                await loginPage.ContinueButton.click();
                await loginPage.performPassword(wrongPass);
                await loginPage.clickLoginButton();
                await loginPage.assertSuccessfulErrorMessagePassword();


            })

        })

    })

    /**
     * Suite de pruebas para la página principal
     * @includes Validación de componentes y navegación
     */
    test.describe('Validación del Home Page', () => {

        /**
         * Configuración inicial autenticada
         * @remarks Ejecuta login exitoso antes de cada test
         */
        test.beforeEach('Configurar sesión autenticada', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const whoIsWatchingPage = new WhoIsWatchingPage(page);

            await loginPage.navigateToLogin();
            await loginPage.login(email, pass);
            await whoIsWatchingPage.assertSuccessfulLogin();


        })


        /**
         * Prueba de visualización de secciones principales
         * @param page - Instancia de Playwright Page
         */
        test('Validar secciones principales del Home', async ({ page }) => {
            const homePage = new HomePage(page);

            /**
             * Validar sección de recomendaciones personalizadas
             */
            await test.step('Recomendados para ti', async () => {
                await homePage.AssertRecommendedForYou();

            })
            /**
            * Validar sección de Continue Watching
            */

            await test.step('Continue Watching', async () => {

                await homePage.AssertContinueWatching();
            })
            /**
            * Validar sección de Top 10
            */
            await test.step('Top 10', async () => {
                await homePage.AssertTop10();
            })


        })

        /**
         * Prueba de funcionalidad de la barra de navegación
         * @param page - Instancia de Playwright Page
         */
        test('Validar botones de navegación superiores', async ({ page }) => {
            const homePage = new HomePage(page);

            /**
             * Validar visibilidad y funcionalidad del botón Home
             */
            await test.step('Verificar botón Home', async () => {
                await homePage.homeButton();
            })

            await test.step('Validación del Botón de búsqueda', async () => {
                await homePage.searchButton();

            })

            await test.step('Validacón botón Mi lista', async () => {
                await homePage.watchListButton();

            })

            await test.step('Validación botón de Espn', async () => {
                await homePage.espnButton();

            })

            await test.step('Validacón botón de Peliculas', async () => {
                await homePage.moviesButton();
            })

            await test.step('Validación botón de series', async () => {
                await homePage.seriesButton();
            })

            await test.step('Validación botón de Originales', async () => {
                await homePage.originalsButton();
            })



        })




    })

    /**
     * Suite de pruebas para funcionalidad de búsqueda
     * @includes Pruebas de acceso y resultados de búsqueda
     */
    test.describe('Validación del sistema de búsqueda', () => {
        const movie = 'Deadpool'; // Término de búsqueda para pruebas

        /**
         * Configuración inicial autenticada
         * @remarks Ejecuta login exitoso antes de cada test
         */
        test.beforeEach('Configurar sesión autenticada', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const whoIsWatchingPage = new WhoIsWatchingPage(page);

            await loginPage.navigateToLogin();
            await loginPage.login(email, pass);
            await whoIsWatchingPage.assertSuccessfulLogin();


        })



        /**
         * Prueba de acceso a la pantalla de búsqueda
         * @param page - Instancia de Playwright Page
         */
        test('Acceso a pantalla de búsqueda', async ({ page }) => {
            const searchPage = new SearchPage(page);
            const homePage = new HomePage(page);

            /**
             * Navegación a la pantalla de búsqueda
             * @expected Debe cargarse correctamente
             */
            await test.step('Navegar a pantalla de búsqueda', async () => {
                await homePage.searchBtn.click();
            })
        })


        /**
         * Prueba de búsqueda y resultados
         * @param page - Instancia de Playwright Page
         */
        test('Buscar película y validar resultados', async ({ page }) => {
            const searchPage = new SearchPage(page);
            const homePage = new HomePage(page);

            /**
             * Flujo completo de búsqueda
             * @steps 1. Acceder a pantalla de búsqueda
             *        2. Ingresar término de búsqueda
             *        3. Validar resultados
             */
            await test.step('Ejecutar búsqueda y validar resultados', async () => {
                await homePage.searchBtn.click();
                await searchPage.SearchInput(movie);
                await searchPage.AssertResultadoBusqueda();
            })
        })




    })




})();
