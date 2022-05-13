import axios from "axios";

export const fetchGenerations = () =>
  axios
    .get("https://pokeapi.co/api/v2/generation")
    .then((response: any) => response.data);

export const fetchGeneration = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/generation/${id}`)
    .then(({ data }) => data);

export const fetchPokemons = () =>
  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((response) => response.data);

export const fetchPokemon = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.data);
