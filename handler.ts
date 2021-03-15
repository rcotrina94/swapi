import { LambdaProxyServer } from "./lib/infraestructure/webserver/server"

import { LambdaMiddleware } from "./lib/infraestructure/middlewares/lambdaMiddleware";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

// Ésta objeto de tipo {LambdaMiddleware} se usará como instancia en caché:
// La función Lambda reusará éste handler para nuevos eventos.
let lambdaHandler: LambdaMiddleware;

export async function proxy(
  event: APIGatewayEvent,
  // context: Context
): Promise<APIGatewayProxyResult> {
  if (!lambdaHandler) { // Mantener en memoria para reusar
    const server = new LambdaProxyServer().instance;
    lambdaHandler = LambdaMiddleware.for(server);
  }
  // Realizar la transformación de evento de APIGateWay-Lambda
  // a un Request que pueda ser manejado por el handler.
  // TODO: Evaluar si el proyecto aprovechará el contexto de ApiGW
  return lambdaHandler.proxy(event);
}
