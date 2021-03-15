export interface IBaseResourceResponse {
    url: string
    created: string,
    edited: string,
}

export interface IBaseResourceListResponse {
    count: number,
    next: string,
    previous: string,
    results: IBaseResourceResponse[]
}

export interface IFilmResponse extends IBaseResourceResponse {
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    characters: string[],
    planets: string[],
    starships: string[],
    vehicles: string[],
    species: string[],
}

export interface IPersonResponse extends IBaseResourceResponse {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: string[],
    species: string[],
    vehicles: string[],
    starships: string[]
}

export interface IFilmListResponse extends IBaseResourceListResponse {
    results: IFilmResponse[]
}

export interface IPeopleListResponse extends IBaseResourceListResponse {
    results: IPersonResponse[]
}


