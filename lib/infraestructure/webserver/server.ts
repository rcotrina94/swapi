import { Request, Server as HapiServer } from "@hapi/hapi"
import { routes } from "../../interfaces/routes"

/**
 * Clase wrapper para instancia de servidor y extensiones
 */
export class LambdaProxyServer {
    private server: HapiServer;

    constructor() {
        // Inicializando servidor
        this.server = new HapiServer()

        // Registrando rutas
        this.server.route(routes);

        // Registrando extensiones y/o hooks
        // TODO: Implementar Sentry
        this.server.ext('onPreResponse', function (request: Request, h) {
            // Loggear todas las respuestas
            // console.log([request.method], request.response.);
            return h.continue;
        });
    }
    /**
     * Método que devuelve una instancia configurada de servidor Hapi
     * @returns {HapiServer} Instancia de servidor Hapi
     */
    get instance(): HapiServer {
        return this.server
    }
}
