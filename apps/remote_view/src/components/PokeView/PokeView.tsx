import { useContext } from 'react';
import { pokemonContext } from '../../store/store';
import { observer } from 'mobx-react';

const PokeView = observer(() => {
  const { pokemon } = useContext(pokemonContext);

  return (
    <div className="flex flex-row gap-6 p-4" style={{ width: 800 }}>
      <div className="p-3 border-4 rounded-xl">
        <img src={pokemon?.sprites?.front_default} height={200} width={200} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-1">
          <label className="text-gray-400">ID:</label>
          <p>{pokemon?.id ?? '?'}</p>
        </div>
        <div className="flex flex-row gap-1">
          <label className="text-gray-400">Name:</label>
          <p>{pokemon?.name ?? '?'}</p>
        </div>
        <div className="flex flex-row gap-1">
          <label className="text-gray-400">Height:</label>
          <p>{(pokemon?.height || 0) * 10 || '?'} centimeters</p>
        </div>
        <div className="flex flex-row gap-1">
          <label className="text-gray-400">Weight:</label>
          <p>{pokemon?.weight || '?'} hectograms</p>
        </div>
      </div>
    </div>
  );
});

export default PokeView;
