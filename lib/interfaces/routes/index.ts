import { ServerRoute } from "@hapi/hapi";
import { BASE_PATH } from "../constants";
import { CatchAllController, ResourceController, ResourcesListController } from "../controllers";

export const routes = <ServerRoute[]>[
    {
        method: 'GET',
        path: BASE_PATH,
        handler: ResourcesListController
    },

    {
        method: ['GET', 'POST'],
        path: `${BASE_PATH}/{resource}/{id*}`,
        handler: ResourceController
    },
    {
        method: '*',
        path: '/{any*}',
        handler: CatchAllController
    },
]
