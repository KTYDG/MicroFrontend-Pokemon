import './App.css';
import './index.css';
import { useContext } from 'react';
import Remote from './components/Remote';
import { pokemonContext } from './store/store';

const App = () => {
  const store = useContext(pokemonContext);
  store.setPokemon({
    id: 1,
    name: 'aboba',
    height: 12,
    weight: 69,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    },
  });

  return (
    <div className="content">
      <h1>Remote Pokemon View!</h1>
      <Remote />
    </div>
  );
};

export default App;
