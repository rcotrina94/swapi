import AWS = require("aws-sdk");
import { PutItemInput, ScanInput } from "aws-sdk/clients/dynamodb";
import { Series } from "../../../domain/models";
import { SeriesRepository as AbstractSeriesRepository } from "../../../domain/repositories";
import dynamoDbConfig from "../../config/dynamodb";
// import {  } from "./interfaces";


export class SeriesRepository extends AbstractSeriesRepository {
    constructor(
        private db = new AWS.DynamoDB.DocumentClient(dynamoDbConfig),
        private tableName = <string>process.env.CUSTOM_TABLE,
    ) {
        super();
    }

    async list(): Promise<Object> {
        const results = await this.db.scan(<ScanInput>{
            TableName: this.tableName,
            ProjectionExpression: "id, nombre, tipo",
            // Limit: 10,
        }).promise()
        return results;
    }

    async retrieve(id: string | number): Promise<Object> {
        var params = {
            // AttributesToGet: [
            // ],
            TableName: this.tableName,
            Key: {
                "id": id
            }
        }
        const result = await this.db.get(params).promise();
        return result;
    }

    async save(serie: Series) {
        const seriesInsert = <PutItemInput>{
            TableName: this.tableName,
            Item: serie.toJSON(),
        };
        await this.db.put(seriesInsert).promise();
        return serie.toJSON();
    }
}
