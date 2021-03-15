# SWAPI

Para correr el siguiente proyecto ejecutar los siguientes comandos en la consola:


Instalar Serverless Framework
```
$ npm i -g serverless
```

Instalar dependencias

```
$ npm ci
```

Iniciar infraestructura local offline (API Gateway y DynamoDB)

```
$ sls offline start
```

Realizar peticiones a:

- `GET ` Listar recursos - http://localhost:3000/dev/api/
- `GET ` Listar recurso - http://localhost:3000/dev/api/{resource}/
- `GET ` Listar recursos película - http://localhost:3000/dev/api/films
- `POST` Crear recurso película - http://localhost:3000/dev/api/films
- `GET ` Obtener recurso película - http://localhost:3000/dev/api/films/{id}
- `GET ` Listar recursos persona - http://localhost:3000/dev/api/people
- `POST` Crear recurso persona - http://localhost:3000/dev/api/people
- `GET ` Obtener recurso persona - http://localhost:3000/dev/api/people/{id}
- `POST` Crear recurso series - http://localhost:3000/dev/api/series
- `GET ` Obtener recursos series - http://localhost:3000/dev/api/series/{id}
- `GET ` Listar recursos series - http://localhost:3000/dev/api/series
