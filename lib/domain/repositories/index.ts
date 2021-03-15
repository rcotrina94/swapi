/**
 * @abstract Repositorio Base
 */
abstract class ReadableRepository {
    abstract list(): unknown
    abstract retrieve(id: string | number): unknown
}

/**
 * @abstract Repositorio Base
 */
abstract class WritableRepository extends ReadableRepository {
    abstract save(data: unknown): unknown
}

/**
 * @abstract Repositorio para Películas
 */
export abstract class FilmsRepository extends ReadableRepository { }

/**
 * @abstract Repositorio para Personas
 */
export abstract class PeopleRepository extends ReadableRepository { }

/**
 * @abstract Repositorio para Series
 */
export abstract class SeriesRepository extends WritableRepository { }
