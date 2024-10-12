import { IPokeResponse } from "@/types/poke";

export const fetchGithubRepo = async (): Promise<IPokeResponse> => {
    const response = await fetch('https://pokeapi.co/api/v2/type/3 ');
    return await response.json();
}