export interface IBaseModel{
    // fromJSON(modelAttrs: unknown): unknown;
    id: string | number | null,
    toJSON(): Object
    fechaCreacion: string,
    fechaEdicion?: string | null,
}


export interface IFilmModel extends IBaseModel{
    titulo: string,
    episodioId: number,
    textoIntro: string,
    director: string,
    productor: string,
    fechaLanzamiento: string,
    personajes: string[],
    planetas: string[],
    naves: string[],
    vehiculos: string[],
    especies: string[]
}


export interface IPeopleModel extends IBaseModel{
    nombre: string,
    altura: string,
    peso: string,
    colorCabello: string,
    colorPiel: string,
    colorOjos: string,
    anioNacimiento: string,
    genero: string,
    mundoResidencia: string,
    peliculas: string[],
    especies: string[],
    vehiculos: string[],
    naves: string[]
}

export interface ISeriesModel extends IBaseModel{
    nombre: string,
    tipo: string,
}
