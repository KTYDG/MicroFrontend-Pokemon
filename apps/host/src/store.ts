import { createContext } from 'react';
import pokemonStore from '@remote_1/store';

export const store = pokemonStore;
export const pokemonContext = createContext(pokemonStore);
