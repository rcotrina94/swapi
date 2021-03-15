declare module '@supercharge/hapi-aws-lambda' {

    import { Server } from "@hapi/hapi";
    import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

    export class HapiRequest {
        constructor(event: APIGatewayEvent);
    }

    export class HapiResponse {
        constructor(response: Object);
    }

    export default class HapiOnAwsLambda {
        constructor(server: Server);

        static for(server: Server): HapiOnAwsLambda;

        createRequestFrom(event: APIGatewayEvent): HapiRequest;

        proxy(event: APIGatewayEvent): APIGatewayProxyResult;

        sendThroughServer(event: APIGatewayEvent): HapiResponse;
        static default: any;
    }
}
