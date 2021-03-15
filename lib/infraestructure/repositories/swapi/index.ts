import { FilmsRepository as AbstractFilmsRepository, PeopleRepository as AbstractPeopleRepository } from "../../../domain/repositories";
import { IFilmListResponse, IFilmResponse, IPeopleListResponse, IPersonResponse } from "./interfaces";
import * as SwapiService from "./swapi.service";

export class FilmsRepository extends AbstractFilmsRepository {
    constructor() {
        super();
    }
    async list(): Promise<IFilmListResponse> {
        const data = <IFilmListResponse>await SwapiService.getFilms();
        return data;
    }
    async retrieve(id: string | number): Promise<IFilmResponse> {
        const data: IFilmResponse = <IFilmResponse>await SwapiService.getFilm(id);
        return data;
    }
}


export class PeopleRepository extends AbstractPeopleRepository {
    constructor() {
        super();
    }
    async list(): Promise<IPeopleListResponse> {
        const data = <IPeopleListResponse>await SwapiService.getPeople();
        return data;
    }
    async retrieve(id: string | number): Promise<IPersonResponse> {
        const data: IPersonResponse = <IPersonResponse>await SwapiService.getPerson(id);
        return data;
    }
}
