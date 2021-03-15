const BASE_PATH = '/api';
const INTEGRATION_RESOURCES = {
    Films: "films",
    People: "people",
    Planets: "planets",
    Species: "species",
    Starships: "starships",
    Vehicles: "vehicles",
}
const CUSTOM_RESOURCES = {
    Series: "series",
}
const RESOURCES = Object.assign(
    INTEGRATION_RESOURCES, CUSTOM_RESOURCES);

export { BASE_PATH, INTEGRATION_RESOURCES, CUSTOM_RESOURCES, RESOURCES };
