import PokemonList from './PokemonList/PokemonList';
import '../index.css';

const Remote = () => {
  return (
    <div
      className="flex items-center justify-center 
        border-8 border-dashed border-red-600 rounded-xl text-3xl"
      style={{
        padding: 10,
        margin: 20,
        minWidth: 870,
        minHeight: 310,
      }}
    >
      <PokemonList />
    </div>
  );
};

export default Remote;
