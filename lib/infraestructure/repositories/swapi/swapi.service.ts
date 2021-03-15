/**
 * Clase Wrapper para servicio Swapi
 * Inspirado en: https://github.com/cfjedimaster/SWAPI-Wrapper
 */
import fetch from 'node-fetch';
import { URLSearchParams } from "url"
import { INTEGRATION_RESOURCES as Res } from "../../../interfaces/constants";
import { IBaseResourceListResponse, IBaseResourceResponse } from './interfaces';

const rootURL = "https://swapi.dev/api/";

async function request(url: string) {
    try {
        const res = await fetch(url);
        return res.json();
    } catch (err) {
        console.error("[ ERROR ]", err);
    }
}

function singularRequestGenerator(resource: string) {
    return async function (id: string | number): Promise<IBaseResourceResponse> {
        return await request(`${rootURL}${resource}/${id}/`);
    };
}

function pluralRequestGenerator(resource: string) {
    return async function (...args: never[]): Promise<IBaseResourceListResponse> {
        let queryObject = {};

        if (args.length > 1) {
            queryObject = args[0];
        } else if (args[0]) {
            // If given exactly one argument
            if (typeof args[0] === "function") {
                queryObject = {};
            } else {
                queryObject = args[0];
            }
        }

        if (queryObject) {
            const searchParams = new URLSearchParams();
            for (const key of Object.keys(queryObject)) {
                const value = queryObject[key];
                searchParams.append(key, value);
            }
            return await request(
                `${rootURL}${resource}/?${searchParams.toString()}`);
        }

        return await request(`${rootURL}${resource}/`);
    };
}
export const getPerson = singularRequestGenerator(Res.People);
export const getPeople = pluralRequestGenerator(Res.People);
export const getFilm = singularRequestGenerator(Res.Films);
export const getFilms = pluralRequestGenerator(Res.Films);
export const getPlanet = singularRequestGenerator(Res.Planets);
export const getPlanets = pluralRequestGenerator(Res.Planets);
export const getSpecies = singularRequestGenerator(Res.Species);
export const getAllSpecies = pluralRequestGenerator(Res.Species);
export const getStarship = singularRequestGenerator(Res.Starships);
export const getStarships = pluralRequestGenerator(Res.Starships);
export const getVehicle = singularRequestGenerator(Res.Vehicles);
export const getVehicles = pluralRequestGenerator(Res.Vehicles);
