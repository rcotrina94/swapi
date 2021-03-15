// TODO: Cargar la configuración dinámicamente.
const dynamoDbConfig = process.env.IS_OFFLINE ? {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
} : {};


export default dynamoDbConfig;
