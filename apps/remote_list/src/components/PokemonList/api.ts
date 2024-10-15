import type { IPokemon } from '../../store/types';

export const fetchPoke = async (url: string): Promise<IPokemon> => {
  const response = await fetch(url);
  return await response.json();
};

interface PokeList {
  pokemons: IPokemon[];
  next?: string;
  previous?: string;
}
export const fetchPokeList = async (
  url?: string,
  params: { limit?: string; offset?: string } = {
    limit: '4',
    offset: '0',
  },
): Promise<PokeList> => {
  try {
    let response;
    if (url) {
      response = await fetch(url);
    } else {
      const searchParams = new URLSearchParams(params);

      response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?${searchParams.toString()}`,
      );
    }

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    const pokemonURLs = result.results;
    const pokemonPromises = pokemonURLs.map(async ({ url }: { url: string }) =>
      fetchPoke(url),
    );
    const pokemons = await Promise.all(pokemonPromises);
    return {
      ...result,
      pokemons,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};