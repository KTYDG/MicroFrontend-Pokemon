import { useQuery } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { fetchPokeList } from './api';
import { Button } from '../Button';
import { Spinner } from '../Spinner';
import { observer } from 'mobx-react';
import { pokemonContext } from '../../store/store';

const PokemonList = observer(() => {
  const store = useContext(pokemonContext);
  const [list, setList] = useState<string | undefined>(undefined);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['pokeList', list],
    queryFn: () => fetchPokeList(list),
  });
  if (isError) {
    return (
      <div>
        Some error: {error.message}
        <br />
        {error.stack}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-center gap-5 min-h-48 w-full">
        {isPending ? (
          <Spinner />
        ) : (
          data.pokemons.map((poke) => (
            <div
              onClick={() => {
                store.setPokemon(poke);
              }}
              key={poke.id}
              className="
                flex flex-col items-center justify-center
                min-w-48 hover:bg-slate-600
                rounded-2xl border-2 border-x-neutral-50"
            >
              <img src={poke.sprites?.front_default} height={128} width={128} />
              <label>{poke.name}</label>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between p-2">
        <Button
          onClick={() => setList(data?.previous)}
          disabled={!data?.previous}
        >
          Previous
        </Button>
        <Button onClick={() => setList(data?.next)} disabled={!data?.next}>
          Next
        </Button>
      </div>
    </div>
  );
});

export default PokemonList;
