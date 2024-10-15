import { makeAutoObservable } from "mobx"
import { createContext } from 'react';
import type { IPokemon } from './types';

export class Pokemon {
  pokemon?: IPokemon;

  constructor() {
    makeAutoObservable(this);
  }

  setPokemon(pokemonData: IPokemon) {
    this.pokemon = pokemonData;
  }
}

export const pokemonStore = new Pokemon();
export const pokemonContext = createContext(pokemonStore)

export default pokemonStore;
