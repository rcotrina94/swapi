import { IFilmResponse, IPersonResponse } from "../../infraestructure/repositories/swapi/interfaces";
import { IFilmModel, IPeopleModel, ISeriesModel } from "../interfaces";

import uuid = require('uuid');


export class Film implements IFilmModel {
    constructor(
        public id: string | number | null,
        public titulo: string,
        public episodioId: number,
        public textoIntro: string,
        public director: string,
        public productor: string,
        public fechaLanzamiento: string,
        public personajes: string[],
        public planetas: string[],
        public naves: string[],
        public vehiculos: string[],
        public especies: string[],
        public fechaCreacion: string,
        public fechaEdicion: string
    ) { }

    static fromJSON(filmAttrs: IFilmResponse): Film {
        const {
            title,
            episode_id,
            opening_crawl,
            director,
            producer,
            release_date,
            characters,
            planets,
            starships,
            vehicles,
            species,
            created,
            edited,
            // url,
        } = filmAttrs;
        return new Film(
            null,
            title,
            episode_id,
            opening_crawl,
            director,
            producer,
            release_date,
            characters,
            planets,
            starships,
            vehicles,
            species,
            created,
            edited
        )
    }

    toJSON(): Object {
        return {
            titulo: this.titulo,
            episodioId: this.episodioId,
            textoIntro: this.textoIntro,
            director: this.director,
            productor: this.productor,
            fechaLanzamiento: this.fechaLanzamiento,
            personajes: this.personajes,
            planetas: this.planetas,
            naves: this.naves,
            vehiculos: this.vehiculos,
            especies: this.especies,
            fechaCreacion: this.fechaCreacion,
            fechaEdicion: this.fechaEdicion,
        };
    }
}


export class People implements IPeopleModel {
    constructor(
        public id: string | number | null,
        public nombre: string,
        public altura: string,
        public peso: string,
        public colorCabello: string,
        public colorPiel: string,
        public colorOjos: string,
        public anioNacimiento: string,
        public genero: string,
        public mundoResidencia: string,
        public peliculas: string[],
        public especies: string[],
        public vehiculos: string[],
        public naves: string[],
        public fechaCreacion: string,
        public fechaEdicion?: string | null
    ) { }

    static fromJSON(personAttrs: IPersonResponse): People {
        const {
            name,
            height,
            mass,
            hair_color,
            skin_color,
            eye_color,
            birth_year,
            gender,
            homeworld,
            films,
            species,
            vehicles,
            starships,
            created,
            edited,
            // url,
        } = personAttrs;
        return new People(
            null,
            name,
            height,
            mass,
            hair_color,
            skin_color,
            eye_color,
            birth_year,
            gender,
            homeworld,
            films,
            species,
            vehicles,
            starships,
            created,
            edited,
        )
    }

    toJSON(): Object {
        return {
            nombre: this.nombre,
            altura: this.altura,
            peso: this.peso,
            colorCabello: this.colorCabello,
            colorPiel: this.colorPiel,
            colorOjos: this.colorOjos,
            anioNacimiento: this.anioNacimiento,
            genero: this.genero,
            mundoResidencia: this.mundoResidencia,
            peliculas: this.peliculas,
            especies: this.especies,
            vehiculos: this.vehiculos,
            naves: this.naves,
            fechaCreacion: this.fechaCreacion,
            fechaEdicion: this.fechaEdicion,
        };
    }
}

interface ISeries {
    id: string | number | null,
    nombre: string,
    tipo: string,
    fechaCreacion: string,
    fechaEdicion?: string,
}


export class Series implements ISeriesModel {
    constructor(
        public id: string | number | null = uuid.v1(),
        public nombre: string,
        public tipo: string,
        public fechaCreacion: string,
        public fechaEdicion?: string | null,
    ) {
        this.id = id || uuid.v1();
    }

    static fromJSON(seriesAttrs: ISeries): Series {
        const {
            id,
            nombre,
            tipo,
            fechaCreacion,
            fechaEdicion,
            // url,
        } = seriesAttrs;
        return new Series(
            id,
            nombre,
            tipo,
            fechaCreacion,
            fechaEdicion,
        )
    }

    toJSON(): Object {
        return {
            id: this.id,
            nombre: this.nombre,
            tipo: this.tipo,
            fechaCreacion: this.fechaCreacion,
            fechaEdicion: this.fechaEdicion,
        };
    }
}
