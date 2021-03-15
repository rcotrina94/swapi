import { Request, ResponseToolkit } from "@hapi/hapi";


import { FilmsRepository, PeopleRepository } from "../../infraestructure/repositories/swapi";
import { BASE_PATH, CUSTOM_RESOURCES, RESOURCES as Resources } from "../constants";

import SwapiSerializer from "../serializers/swapi.serializer";
import { Film, People, Series } from "../../domain/models";
import { IBaseModel } from "../../domain/interfaces";
import { SeriesRepository } from "../../infraestructure/repositories/dynamodb";


/**
 * Controlador para mostrar la lista de recursos.
 * @param {Request} request - Objeto petición
 * @param {ŔesponseToolkit} h - Toolkit de Framework Hapi
 * @return {Object} Objeto a retornar por el controlador.
*/
export function ResourcesListController(request: Request): unknown {
    const baseUrl = request.url.toString().split(BASE_PATH).slice(0, 1);
    const basePath = `${process.env.stage ?
        `/${process.env.stage}` : ''}${BASE_PATH}`;

    const resourceMap = {};

    for (const resource of Object.values(Resources)) {
        resourceMap[resource] = `${baseUrl}${basePath}/${resource}`;
    }
    return resourceMap;
}

/**
 * Controlador para manejar GET y POST de recursos.
 * @param {Request} request - Objeto petición
 * @param {ŔesponseToolkit} h - Toolkit de Framework Hapi
 * @return {Promise<Object>} Objeto a retornar por el controlador.
*/
export async function ResourceController(
    request: Request, h: ResponseToolkit): Promise<unknown> {
    const error404 = h.response({ error: 404 }).code(404);
    const error405 = h.response({ error: 405 }).code(405);
    const isPost = request.method == 'post';

    const { resource, id } = request.params;
    if (!resource) return error404;
    if (id && isPost) return error405;

    // TODO: Documentar a detalle

    if (Object.values(Resources).includes(resource)) {
        if (Object.values(CUSTOM_RESOURCES).includes(resource)) {
            if (isPost) {
                // TODO: Separar lógica POST/GET
                // TODO: Validaciones JOI
                const { nombre, tipo } = <{ nombre: string, tipo: string }>request.payload;
                const saved = await new SeriesRepository().save(Series.fromJSON({
                    id: null,
                    nombre: nombre,
                    tipo: tipo,
                    fechaCreacion: `${new Date().toISOString()}`
                }));
                return { resource, id, custom: true, saved };
            } else {
                if (!id) {
                    const results = await new SeriesRepository().list();
                    return { resource, id, custom: true, results };
                } else {
                    return await new SeriesRepository().retrieve(id);
                }
            }
        } else {
            // TODO: Usar service locator
            if (!isPost) {
                if (!id) {
                    let results: any;
                    switch (resource) {
                        case Resources.Films: {
                            const swapiResponse = await new FilmsRepository().list();
                            results = swapiResponse.results
                                .map(filmResponse => Film.fromJSON(filmResponse))
                            break;
                        }
                        case Resources.People: {
                            const swapiResponse = await new PeopleRepository().list();
                            results = swapiResponse.results
                                .map(peopleResponse => People.fromJSON(peopleResponse))
                            break;
                        }
                        default:
                            break;
                    }
                    return {
                        resource,
                        custom: false,
                        count: results.length,
                        results: results.map(
                            (result: IBaseModel) => SwapiSerializer(result))
                    };
                } else {
                    let response: any;
                    switch (resource) {

                        case Resources.Films: {
                            const r = await new FilmsRepository().retrieve(id);
                            response = Film.fromJSON(r)
                        }
                        default:
                            break;
                    }
                    return SwapiSerializer(response)
                }

            }
            return error405;
        }
    }
    return error404;
}

/**
 * Controlador para manejar todas las demás peticiones.
 * @param {Request} request - Objeto petición
 * @param {ŔesponseToolkit} h - Toolkit de Framework Hapi
 * @return {Object} Objeto a retornar por el controlador.
*/
export const CatchAllController = function (
    _: Request, h: ResponseToolkit): unknown {
    return h.response({ error: 404 }).code(404)
}
